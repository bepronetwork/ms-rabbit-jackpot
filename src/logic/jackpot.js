const _ = require('lodash');
import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import { AppRepository, JackpotRepository, WalletsRepository, UsersRepository, GamesRepository, CurrencyRepository } from '../db/repos';
import CasinoLogicSingleton from './utils/casino';
import { CryptographySingleton } from '../controllers/Helpers';
import PusherSingleton from './third-parties/pusher';
import Mailer from './services/mailer';
import { BetResultSpace, Bet } from '../models';
import GamesEcoRepository from '../db/repos/ecosystem/game';
import { throwError } from '../controllers/Errors/ErrorManager';

let error = new ErrorManager();


// Private fields
let self; // eslint-disable-line no-unused-vars
let library;
let modules;

let __private = {};


const betJackpotActions = {
	calculateWin: ({userResultSpace, outcomeResultSpace}) => {
    	try {
			var el = userResultSpace.find( object => parseInt(object.place) == parseInt(outcomeResultSpace.index));
			const isWon = (!el) ? false : true;
            return {
                isWon
            }
        }catch(err){
            throw err;
        }
    },
    auto : (params) => {
		var hmca_hash, outcome, isWon, outcomeResultSpace;

		hmca_hash = CryptographySingleton.generateRandomResult(params.serverSeed, params.clientSeed, params.nonce);
        outcome = CryptographySingleton.hexToInt(hmca_hash);
        outcomeResultSpace 	= CasinoLogicSingleton.fromOutcometoResultSpace(outcome, params.resultSpace)
        var { isWon } = betJackpotActions.calculateWin({
            userResultSpace : params.result,
            outcomeResultSpace : outcomeResultSpace
        });

        return { outcomeResultSpace, isWon, outcome, hmca_hash };
    }
}

/**
 * Login logic.
 *
 * @class
 * @memberof logic
 * @param {function} params - Function Params
 **/


const processActions = {

	__editEdgeJackpot : async (params) => {
		try {
			let app = await AppRepository.prototype.findAppById(user.app_id);
			if(!app){throwError('APP_NOT_EXISTENT')}
			if(app.addOn.jackpot==undefined || app.addOn.jackpot==null) {throwError('JACKPOT_NOT_EXIST_IN_APP')}
			let jackpot = await JackpotRepository.prototype.findJackpotById(app.addOn.jackpot);
			if(!jackpot){throwError('JACKPOT_NOT_EXIST_IN_APP')}

			return {
				edge: params.edge,
				jackpot_id: jackpot._id
			}

		}catch(err){
			throw err;
		}
	},
	__register : async (params) => {
		return params;
	},
	__percentage : async (params) => {
		try {
			let user = await UsersRepository.prototype.findUserById(params.user);
            let app = await AppRepository.prototype.findAppById(user.app_id);
            
			if(app.addOn.jackpot==undefined){
				return {percentage: 0};
			}
			let jackpot = await JackpotRepository.prototype.findJackpotById(app.addOn.jackpot);
			if(!jackpot) {
				return {percentage: 0};
			}

			let result = params.result.map(r => {
				return {
					value: (parseFloat(r.value) * parseFloat(jackpot.edge) * 0.01)
				};
			});

			let percentage = result.reduce( (acc, result) => {
				return acc + parseFloat(result.value);
			}, 0);

			let toTestResult = params.result.map(r => {
				return {
					value: (parseFloat(r.value))
				};
			});
			let amountTest = toTestResult.reduce( (acc, result) => {
				return acc + parseFloat(result.value);
			}, 0);

			return {
				percentage
			};
		}catch(err){
			throw err;
		}
	},
	__normalizeSpaceResult : async (params) => {
		try {
			let user 	= await UsersRepository.prototype.findUserById(params.user);
			let app  	= await AppRepository.prototype.findAppById(user.app_id);
			if(app.addOn.jackpot==undefined){
				return {res: params};
			}
			let jackpot = await JackpotRepository.prototype.findJackpotById(app.addOn.jackpot);
			if(!jackpot) {
				return {res: params};
			}

			let result = params.result.map(r => {
				return {
					place: r.place,
					value: (parseFloat(r.value) * (100 - parseFloat(jackpot.edge)) * 0.01)
				};
			});

			params.result = result;

			return {
				res: params
			};
		}catch(err){
			throw err;
		}
	},
	__bet : async (params) => {
		try{
            let { currency, jackpotBet, nonce } = params;
            console.log("jackpotBet", jackpotBet);
			let game = await GamesRepository.prototype.findGameById(params.game);
            let user = await UsersRepository.prototype.findUserById(params.user);
			let app  = await AppRepository.prototype.findAppById(user.app_id);

            /* No Mapping Error Verification */
            if(!app || (app._id != params.app)){throwError('APP_NOT_EXISTENT')}
            if(!user){throwError('USER_NOT_EXISTENT')};

			/* Get balance by wallet type */
			const userWallet = user.wallet.find( w => new String(w.currency._id).toString() == new String(currency).toString());
            const appWallet  = app.wallet.find( w => new String(w.currency._id).toString() == new String(currency).toString());
            if(!appWallet || !userWallet){throwError('CURRENCY_NOT_EXISTENT')};

            var serverSeed = CryptographySingleton.generateSeed();
            var clientSeed = CryptographySingleton.generateSeed();

			let jackpot = await JackpotRepository.prototype.findJackpotById(app.addOn.jackpot);
			let gameEcosystem = await GamesEcoRepository.prototype.findGameByMetaName("jackpot_auto");
            jackpot.resultSpace = gameEcosystem.resultSpace;
            
            let resultBetted = [{
                place : CasinoLogicSingleton.fromOutcometoResultSpace(CryptographySingleton.hexToInt(CryptographySingleton.generateRandomResult(CryptographySingleton.generateSeed(), CryptographySingleton.generateSeed(), nonce)), jackpot.resultSpace).index,
                value : jackpotBet
            }];

            /* Get Bet Result */
            let { isWon, outcomeResultSpace } = betJackpotActions.auto({
                serverSeed : serverSeed,
                clientSeed : clientSeed,
                nonce : nonce,
                resultSpace : jackpot.resultSpace,
                result : resultBetted,
                edge : jackpot.edge
            });

			// get jackpot of this currency
			let limit = jackpot.limits.find((lm) => (new String(lm.currency).toString()) == (new String(currency).toString()) );

			let user_delta = 0;
			let pot_delta  = 0;

            if(isWon){
                /* User Won Bet */
				user_delta 	= parseFloat(limit.pot+jackpotBet);
				pot_delta	= -parseFloat(limit.pot);
			} else {
				/* User Lost Bet */
				user_delta = 0;
				pot_delta = parseFloat(jackpotBet);
			}

			currency = await CurrencyRepository.prototype.findById(currency);

            let normalized = {
				winAmount           : user_delta,
				nonce               : params.nonce,
				serverHashedSeed    : CryptographySingleton.hashSeed(serverSeed),
				fee 				: 0,
				timestamp   		: new Date(),
				betAmount 			: jackpotBet,
				game    			: game._id,
				result 				: resultBetted,
				currency 			: currency._id,
				user_id 			: user._id,
				outcomeResultSpace,
				serverSeed,
				pot_delta,
				clientSeed,
				isWon,
				jackpot,
				user_delta,
				jackpotBet,
                userWallet,
                appWallet,
				app,
				user
            }
            return normalized;
        }catch(err){
            throw err;
        }
	}
}

/**
 * Login logic.
 *
 * @class progressActions
 * @memberof logic
 * @param {function} params - Function Params
 **/


const progressActions = {
	__editEdgeJackpot : async (params) => {
		try {
			let res = await JackpotRepository.prototype.editEdgeJackpot(params.jackpot_id, params.edge);
			return res;
		}catch(err){
			throw err;
		}
	},
	__register : async (params) => {
		try{
			let jackpot = await self.save(params);
			return jackpot;
		}catch(err){
			throw err;
		}
	},
	__percentage : async (params) => {
		try{
			let { percentage } = params;
			return percentage;
		}catch(err){
			throw err;
		}
	},
	__normalizeSpaceResult : async (params) => {
		try{
			let { res } = params;
			return res;
		}catch(err){
			throw err;
		}
	},
	__bet : async (params) => {
		try{
			let {jackpot, currency, user_delta, userWallet, pot_delta, isWon, user_id, result, appWallet} = params;

			/* Save all ResultSpaces */
			 let dependentObjects = Object.keys(result).map( async key =>
				await (new BetResultSpace(result[key])).register()
			);

			let betResultSpacesIds = await Promise.all(dependentObjects);
			// Generate new Params Setup
			params = {
				...params,
				result : betResultSpacesIds,
				isResolved : true,
				isJackpot  : true
			}
			/* Save Bet */
			let bet = await (new Bet(params).save());

			await JackpotRepository.prototype.updatePot(jackpot._id, currency, pot_delta );

			/* Add Bet to User Profile */
			await UsersRepository.prototype.addBet(user_id, bet._id);
			/* Add Bet to Jackpot */
			await JackpotRepository.prototype.addBet(jackpot._id, bet._id);

			if(isWon) {
                /* Add balance for user */
                await WalletsRepository.prototype.updatePlayBalance(userWallet._id, parseFloat(user_delta) );
                /* Remove balance for app */
                await WalletsRepository.prototype.updatePlayBalance(appWallet._id, -parseFloat(user_delta) );
				/* Save result win jackpot */
				await JackpotRepository.prototype.addWinResult(jackpot._id, {
					user: user_id,
					winAmount: user_delta,
					bet: bet._id,
					currency
				});

				/* Send Notification */
				PusherSingleton.trigger({
					channel_name: user_id,
					isPrivate: true,
					message: `You won the jackpot ${parseFloat(user_delta)}`,
					eventType: 'JACKPOT'
				})
				/* Send Email */
				let mail = new Mailer();
				let attributes = {
					TEXT: `You won the jackpot ${parseFloat(user_delta)}`
                };
                
				mail.sendEmail({app_id : params.app.id, user: params.user, action : 'USER_NOTIFICATION', attributes});
			}

            console.log(`user ${params.user._id} received/lost: ${user_delta}`);
			return params;
		}catch(err){
			throw err;
		}
	}
}

/**
 * Main Jackpot logic.
 *
 * @class
 * @memberof logic
 * @see Parent: {@link logic}
 * @requires lodash
 * @requires helpers/sort_by
 * @requires helpers/bignum
 * @requires logic/block_reward
 * @param {Database} db
 * @param {ZSchema} schema
 * @param {Object} logger
 * @param {function} cb - Callback function
 * @property {Jackpot_model} model
 * @property {Jackpot_schema} schema
 * @returns {setImmediate} error, this
 * @todo Add description for the params
 */


class JackpotLogic extends LogicComponent {
	constructor(scope) {
		super(scope);
		self = this;
		__private = {
			//ADD
			db : scope.db,
			__normalizedSelf : null
		};

		library = {
			process : processActions,
			progress : progressActions
		}
    }


    /**
	 * Validates Jackpot schema.
	 *
	 * @param {Jackpot} Jackpot
	 * @returns {Jackpot} Jackpot
	 * @throws {string} On schema.validate failure
	 */
	async objectNormalize(params, processAction) {
		try{
			switch(processAction) {
				case 'Register' : {
					return await library.process.__register(params); break;
				};
				case 'NormalizeSpaceResult' : {
					return await library.process.__normalizeSpaceResult(params); break;
				};
				case 'Bet' : {
					return await library.process.__bet(params); break;
				};
				case 'Percentage' : {
					return await library.process.__percentage(params); break;
				};
			}
		}catch(error){
			throw error;
		}
	}

	 /**
	 * Tests Jackpot schema.
	 *
	 * @param {Jackpot} Jackpot
	 * @returns {Jackpot} Jackpot
	 * @throws {string} On schema.validate failure
	 */

	testParams(params, action){
		try{
			error.jackpot(params, action);
		}catch(err){
			throw err;
		}
	}

	async progress(params, progressAction){
		try{
			switch(progressAction) {
				case 'Register' : {
					return await library.progress.__register(params); break;
				}
				case 'NormalizeSpaceResult' : {
					return await library.progress.__normalizeSpaceResult(params); break;
				};
				case 'Bet' : {
					return await library.progress.__bet(params); break;
				};
				case 'Percentage' : {
					return await library.progress.__percentage(params); break;
				};
			}
		}catch(error){
			throw error;
		}
	}
}

// Export Default Module
export default JackpotLogic;