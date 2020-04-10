import MongoComponent from './MongoComponent';
import { UserSchema } from '../schemas/user';

import { 
    pipeline_bet_stats, 
    pipeline_financial_stats, 
    pipeline_user_wallet,
    pipeline_all_users_balance,
    pipeline_my_bets
} from './pipelines/user';
import { populate_user } from './populates';
import { throwError } from '../../controllers/Errors/ErrorManager';
import { usersFromAppFiltered } from './pipelines/user/users_from_app';
/**
 * Accounts database interaction class.
 *
 * @class
 * @memberof db.repos.accounts
 * @requires bluebird
 * @requires lodash
 * @requires db/sql.accounts
 * @see Parent: {@link db.repos.accounts}
 */


const foreignKeys = ['wallet', 'app_id', 'withdraws', 'deposits', 'affiliate'];

class UsersRepository extends MongoComponent{

    constructor(){
        super(UserSchema)
    }
    /**
     * @function setUserModel
     * @param User Model
     * @return {Schema} UserModel
     */

    setModel = (user) => {
        return UsersRepository.prototype.schema.model(user)
    }

    updateUser({id, param}) {
        return new Promise( async (resolve,reject) => {
            UserSchema.prototype.model.findByIdAndUpdate(
                id,
                { $set : param },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    async findUserById(_id){
        try{
            return new Promise( (resolve, reject) => {
                UsersRepository.prototype.schema.model.findById(_id)
                .populate(populate_user)
                .exec( (err, user) => {
                    if(err) { resolve(null)}
                    resolve(user);
                });
            });
        }catch(err){
            throw (err)
        }
    }

    getBets({id, size=15, dates, currency}){ 
        console.log("dates ", dates, currency);
        try{
            return new Promise( (resolve, reject) => {
                UsersRepository.prototype.schema.model
                .aggregate(pipeline_my_bets(id,{ dates, currency }))
                .exec( (err, data) => {
                    if(err) { reject(err)}
                    resolve(data.slice(0, size));
                });
            });
        }catch(err){
            throw err;
        }
    }

    setEmptyWallet(user_id){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model.findByIdAndUpdate(
                user_id, 
                { $set: { "wallet" : [] } },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    findUser(username){
        return new Promise( (resolve, reject) => {
            UsersRepository.prototype.schema.model.findOne({$or: [
                {"username": username},
                {"email": username}
            ]})
            .populate(populate_user)
            .lean()
            .exec( (err, user) => {
                if(err) {reject(err)}
                resolve(user);
            });
        });
    }

    findUserByEmail(email){
        return new Promise( (resolve, reject) => {
            UsersRepository.prototype.schema.model.findOne({'email' : new String(email).toLowerCase().trim()})
            .populate(populate_user)
            .lean()
            .exec( (err, user) => {
                if(err) {reject(err)}
                resolve(user);
            });
        });
    }

    addDeposit(user_id, deposit){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model.findOneAndUpdate(
                { _id: user_id, deposits : {$nin : [deposit._id] } }, 
                { $push: { "deposits" : deposit } },
                (err, item) => {
                    if(err){reject(err)}
                    resolve(true);
                }
            )
        });
    }
    
    addWithdraw(user_id, withdraw){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model.findOneAndUpdate(
                { _id: user_id, withdraws : {$nin : [withdraw._id] } }, 
                { $push: { "withdraws" : withdraw } },
                (err, item) => {
                    if(err){reject(err)}
                    resolve(true);
                }
            )
        });
    }
    
    addBet(user_id, bet){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model.findOneAndUpdate(
                { _id: user_id, bets : {$nin : [bet._id] } }, 
                { $push: { "bets" : bet } },
                (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    setAffiliateLink(user_id, affiliateLinkId){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model.findOneAndUpdate(
                { _id: user_id },
                { $set: { "affiliateLink" : affiliateLinkId} },
                { 'new': true })
            .exec( (err, item) => {
                if(err){reject(err)}
                resolve(item);
            })
        });
    }

    setAffiliate(user_id, affiliateId){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model.findOneAndUpdate(
                { _id: user_id },
                { $set: { "affiliate" : affiliateId} },
                { 'new': true })
            .exec( (err, item) => {
                if(err){reject(err)}
                resolve(item);
            })
        });
    }

    addCurrencyWallet(user_id, wallet){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model.findOneAndUpdate(
                { _id: user_id, wallet : {$nin : [wallet._id] } }, 
                { $push: { "wallet" : wallet} },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    setSecurityId(user_id, securityId){
        return new Promise( (resolve, reject) => {
            UsersRepository.prototype.schema.model.findOneAndUpdate(
                { _id: user_id },
                { $set: { "security": securityId } },
                { 'new' : true })
            .exec( (err, item) => {
                if(err){reject(err)}
                resolve(item);
            })
        });
    }

    async getAll(){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model.find().lean().populate(foreignKeys)
            .exec( (err, docs) => {
                if(err){reject(err)}
                resolve(docs);
            })
        })
    }

    async getAllFiltered({size=30, offset=0, app, user}){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model
            .aggregate(usersFromAppFiltered({size, offset, app, user}))
            .exec( (err, docs) => {
                if(err){reject(err)}
                resolve(docs);
            })
        })
    }

    async changeWithdrawPosition(_id, state){
        try{
            return new Promise( (resolve, reject) => {
                UsersRepository.prototype.schema.model.findByIdAndUpdate(
                    { _id: _id },
                    { $set: { "isWithdrawing" : state} }) 
                    .exec( (err, item) => {
                        if(err){reject(err)}
                        try{
                            if((state == true) && (item.isWithdrawing == true)){throwError('WITHDRAW_MODE_IN_API')}
                            resolve(item);
                        }catch(err){
                            reject(err);
                        }

                    }
                )
            })
        }catch(err){
            throw (err)
        }
    }

    async getAllUsersBalance({app}){
        try{
            return new Promise( (resolve, reject) => {
                UsersRepository.prototype.schema.model
                .aggregate(pipeline_all_users_balance(app))
                .exec( (err, item) => {
                    if(err) { reject(err)}
                    var res;
                    if(!item || !item[0]){ res = { balance : 0} }
                    else{res = item[0]}
                    resolve(res);
                });
            })
        }catch(err){
            throw err;
        }
        
    }

    async findUserByExternalId(external_id){
        try{
            return new Promise( (resolve, reject) => {
                UsersRepository.prototype.schema.model.find({external_id : external_id})
                .populate(foreignKeys)
                .exec( (err, user) => {
                    if(err) { reject(err)}
                    resolve(user);
                });
            });
        }catch(err){
            throw (err)
        }
    }

    createAPIToken(user_id, bearerToken){
        return new Promise( (resolve,reject) => {
            UsersRepository.prototype.schema.model.findByIdAndUpdate(
                user_id, 
                { $set: { "bearerToken" : new String(bearerToken) } },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    async findUserByAddress({address, app}){
        try{
            return new Promise( (resolve, reject) => {
                UsersRepository.prototype.schema.model.find(
                    { $and: [ { address: address}, { app_id: app} ] })
                .populate(foreignKeys)
                .exec( (err, users) => {
                    if(err) { reject(err)}
                    var res;
                    if(users.length > 0) {res = users};
                    if(users.length == 0) {res = null}
                    resolve(res);
                });
            });
        }catch(err){
            throw (err)
        }
    }


    async getSummaryStats(type, _id, { dates, currency }){ 

        let pipeline;

        /**
         * @input Type
         * @output Pipeline
         */

        switch (new String(type).toUpperCase().trim()){
            case 'FINANCIAL' : pipeline = pipeline_financial_stats; break;
            case 'BETS' : pipeline = pipeline_bet_stats; break;
            case 'WALLET' : pipeline = pipeline_user_wallet; break;
            default : throw new Error(` Type : ${type} is not accepted as a Summary Type API Call`);
        }

        return new Promise( (resolve, reject) => {
            UsersRepository.prototype.schema.model
            .aggregate(pipeline(_id, { dates, currency }))
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }
}

UsersRepository.prototype.schema = new UserSchema();

export default UsersRepository;