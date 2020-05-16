import _ from 'lodash';
import { ErrorManager } from '../controllers/Errors';
import { GamesRepository, UsersRepository, WalletsRepository } from '../db/repos';
import LogicComponent from './logicComponent';
import { CryptographySingleton } from '../controllers/Helpers';
import CasinoLogicSingleton from './utils/casino';
import { BetResultSpace } from '../models';
import { throwError } from '../controllers/Errors/ErrorManager';
import { getAffiliatesReturn } from './utils/affiliates';

 
let error = new ErrorManager();


// Private fields
let self; // eslint-disable-line no-unused-vars
let library;
let modules;

let __private = {};


// TO DO : Create Different Type of Resolving Actions for Casino
const betResolvingActions = {
    auto : (params) => {
		var hmca_hash, outcome, isWon, outcomeResultSpace;

		/**
		 * @function HMCA SHA512 Result Output
		 */

		hmca_hash = CryptographySingleton.generateRandomResult(params.serverSeed, params.clientSeed, params.nonce),
		outcome = CryptographySingleton.hexToInt(hmca_hash) 
		 
		outcomeResultSpace 	= CasinoLogicSingleton.fromOutcometoResultSpace(outcome, params.resultSpace)

        var { winAmount, isWon, totalBetAmount } =  CasinoLogicSingleton.calculateWinAmountWithOutcome({
            userResultSpace : params.result,
            resultSpace : params.resultSpace,
            totalBetAmount : params.betAmount,
            outcomeResultSpace : outcomeResultSpace,
            houseEdge : params.edge,
            game : params.gameMetaName
        });
        
        return { winAmount, outcomeResultSpace, isWon, outcome, totalBetAmount, hmca_hash };
    },
    oracled : (params) => {
        let hmca_hash, outcome, isWon, outcomeResultSpace;

		/**
		 * @function HMCA SHA512 Result Output
		 */

		hmca_hash = CryptographySingleton.generateRandomResult(params.serverSeed, params.clientSeed, params.nonce),
		 
		outcomeResultSpace 	= params.outcome;
		isWon 	       		= CasinoLogicSingleton.isWon(outcomeResultSpace, params.result);

        var { winAmount : possibleWinAmount } =  CasinoLogicSingleton.calculateMaxWinAmount({
            userResultSpace : params.result, 
			resultSpace : params.resultSpace,
            houseEdge : params.edge,
            gameMetaName : params.gameMetaName
        });

        let winAmount = isWon ? possibleWinAmount : 0;
        
        return {...params, winAmount, outcomeResultSpace, isWon, possibleWinAmount, outcome, hmca_hash};

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
    __auto : async (params) => {
        try{
            const { currency } = params;

            let game = await GamesRepository.prototype.findGameById(params.game);
            let user = await UsersRepository.prototype.findUserById(params.user);
            let app = user.app_id;
            if(game){var maxBetValue = game.maxBet}
            

            /* No Mapping Error Verification */
            if(!app || (app._id != params.app)){throwError('APP_NOT_EXISTENT')}
            if(!game || (game.metaName != 'jackpot_auto')){throwError('GAME_NOT_EXISTENT')}
            if(!user){throwError('USER_NOT_EXISTENT')}
            if(maxBetValue){if(maxBetValue === undefined || maxBetValue === null){throwError('MAX_BET_NOT_EXISTENT')}}
            
            var affiliateReturns = [], totalAffiliateReturn = 0;
            var user_delta, app_delta;
            var user_in_app = (app._id == params.app);

            /* Get balance by wallet type */
            const appWallet = app.wallet.find( w => new String(w.currency._id).toString() == new String(currency).toString());
            const userWallet = user.wallet.find( w => new String(w.currency._id).toString() == new String(currency).toString());

            let appPlayBalance = parseFloat(appWallet.playBalance);
            let userBalance = parseFloat(userWallet.playBalance);

            let resultBetted = CasinoLogicSingleton.normalizeBet(params.result);
            var serverSeed = CryptographySingleton.generateSeed();
            var clientSeed = CryptographySingleton.generateSeed();
            const { affiliateLink } = user;
            const isUserAffiliated = (affiliateLink != null && !_.isEmpty(affiliateLink))

            /* Verify if Withdrawing Mode is ON - User */
            let isUserWithdrawingAPI = user.isWithdrawing;
            /* Verify if Withdrawing Mode is ON - App */
            let isAppWithdrawingAPI = app.isWithdrawing;

            /* Get Possible Win Balance for Bet */ 
            let { totalBetAmount, possibleWinAmount, fee } = CasinoLogicSingleton.calculateMaxWinAmount({
                userResultSpace : resultBetted,
                resultSpace : game.resultSpace,
                houseEdge : game.edge,
                game : game.metaName
            }); 
            /* Error Check Before Bet Result to bet set */
            if(userBalance < totalBetAmount){throwError('INSUFFICIENT_FUNDS')}
            if(maxBetValue){if(maxBetValue < totalBetAmount){throwError('MAX_BET_ACHIEVED')}}

            /* Get Bet Result */
            let { isWon,  winAmount, outcomeResultSpace } = betResolvingActions.auto({
                serverSeed : serverSeed,
                clientSeed : clientSeed,
                nonce : params.nonce,
                resultSpace : game.resultSpace,
                result : resultBetted,
                gameMetaName : game.metaName,
                betAmount : totalBetAmount,
                edge : game.edge
            });

            if(isWon){
                /* User Won Bet */
                const delta = Math.abs(winAmount) - Math.abs(totalBetAmount);
                user_delta = parseFloat(delta);
                app_delta = parseFloat(-delta);
            }else{
                /* User Lost Bet */
                user_delta = parseFloat(-Math.abs(totalBetAmount));
                /* Set App Cut without Affiliate Return */
                app_delta = 0;
            }

            var possibleWinBalance = parseFloat(possibleWinAmount + userBalance);

            const tableLimit = (game.wallets.find( w => w.wallet.toString() == appWallet._id.toString() )).tableLimit;

            let normalized = {
                user_in_app,
                isUserWithdrawingAPI,
                isAppWithdrawingAPI,
                user_delta,
                app_delta,
                isUserAffiliated,
                affiliateReturns,
                totalAffiliateReturn,
                appWallet,
                currency,
                tableLimit,
                wallet				            :   userWallet,
                user                            :   user._id, 				    
                app                             :   app._id,
                outcomeResultSpace              :   outcomeResultSpace,
                isWon                           :   isWon,
                game                            :   game._id,
                betSystem                       :   game.betSystem,
                appPlayBalance		:   appPlayBalance, 
                playBalance         :   userBalance,
                possibleWinAmount,
                possibleWinBalance,
                winAmount,
                betAmount           :   totalBetAmount,
                fee,
                result         		:   resultBetted,			   
                timestamp           :   new Date(),
                nonce               :   params.nonce,
                clientSeed          :   clientSeed,
                serverHashedSeed    :   CryptographySingleton.hashSeed(serverSeed),
                serverSeed          :   serverSeed
            }
            return normalized;
        }catch(err){
            throw err;
        }
    },
	__register : async (params) => {
        return params;
	},
	__resolve : async (params) => {
	
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
    __auto : async (params) => {
        const { isUserAffiliated, affiliateReturns, result, user_delta, app_delta, wallet, appWallet } = params;
        /* Save all ResultSpaces */
        let dependentObjects = Object.keys(result).map( async key => 
            await (new BetResultSpace(result[key])).register()
        );

        let betResultSpacesIds = await Promise.all(dependentObjects);
        // Generate new Params Setup

        params = {
            ...params,
            result : betResultSpacesIds,
            isResolved : true
        }
        /* Save Bet */
        let bet = await self.save(params);
		/* Update PlayBalance */
        await WalletsRepository.prototype.updatePlayBalance(wallet._id, user_delta);
        /* Update App PlayBalance */
        await WalletsRepository.prototype.updatePlayBalance(appWallet._id, app_delta);
		/* Add Bet to User Profile */
		await UsersRepository.prototype.addBet(params.user, bet);
		/* Add Bet to Event Profile */
        await GamesRepository.prototype.addBet(params.game, bet);

        let res = {
            bet,
            ...params
        }
		return res;
	},
	__register : async (params) => {
        let bet = await self.save(params);
        return bet;
	},
	__resolve : async (params) => {
    
    }
}
/**
 * Main Bet logic.
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
 * @property {Bet_model} model
 * @property {Bet_schema} schema
 * @returns {setImmediate} error, this
 * @todo Add description for the params
 */


class BetLogic extends LogicComponent{
	constructor(scope) {
		super(scope);
		self = this;
		__private = {
			db : scope.db,
			__normalizedSelf : null
		};

		library = {
			process  : processActions,
			progress : progressActions
		}
    }


    /**
	 * Validates Bet schema.
	 *
	 * @param {Bet} Bet
	 * @returns {Bet} Bet
	 * @throws {string} On schema.validate failure
	 */
	async objectNormalize(params, processAction) {
		try{			
			switch(processAction) {
                case 'Auto' : {
					return await library.process.__auto(params); break;
				};
				case 'Register' : {
					return await library.process.__register(params); break;
				};
				case 'Resolve' : {
					return await library.process.__resolve(params); break;
                };
			}
		}catch(err){
			throw err;
		}
	}

	 /**
	 * Tests Bet schema.
	 *
	 * @param {Bet} Bet
	 * @returns {Bet} Bet
	 * @throws {string} On schema.validate failure
	 */

	testParams(params, action){
		try{
			error.bet(params, action);
		}catch(err){
			throw err;
		}
	}

	async progress(params, progressAction){
		try{			
			switch(progressAction) {
                case 'Auto' : {
					return await library.progress.__auto(params); break;
				};
				case 'Register' : {
					return await library.progress.__register(params); break;
				};
				case 'Resolve' : {
					return await library.progress.__resolve(params); break;
                };
			}
		}catch(report){
			throw `Failed to validate user schema: User \n See Stack Trace : ${report}`;
		}
	}
}

export default BetLogic;

