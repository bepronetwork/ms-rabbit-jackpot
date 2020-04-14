import MongoComponent from './MongoComponent';
import { JackpotSchema } from '../schemas';
import AppRepository from './app';

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


class JackpotRepository extends MongoComponent{

    constructor(){
        super(JackpotSchema)
    }
    /**
     * @function setJackpotModel
     * @param Jackpot Model
     * @return {Schema} JackpotModel
     */

    setModel = (Jackpot) => {
        return JackpotRepository.prototype.schema.model(Jackpot)
    }

    updatePot(_id, currency, pot){
        return new Promise( (resolve,reject) => {
            JackpotRepository.prototype.schema.model.updateOne(
                {_id, "limits.currency": currency},
                { $inc : { "limits.$.pot" : parseFloat(pot) } } ,{ new: true }
            )
            .exec( async (err, item) => {
                if(err){reject(err)}
                resolve(item);
            })
        });
    }

    editEdgeJackpot(_id, edge) {
        return new Promise( (resolve, reject) => {
            JackpotRepository.prototype.schema.model.findByIdAndUpdate(
                _id,
                {
                    $set: { edge }
                }
            ).exec( (err, item) => {
                if(err){reject(err)}
                resolve(item);
            });
        });
    }

    setNonce(app){
        return new Promise(async (resolve, reject) => {
            let jackpot_id = (await JackpotRepository.prototype.findJackpotByApp(app))._id;
            JackpotRepository.prototype.schema.model.findOneAndUpdate(
                {_id: jackpot_id},
                { $inc : { nonce : 1 } } ,{ new: true }
            )
            .exec( (err, jackpot) => {
                if(err) { reject(err) }
                resolve(jackpot);
            });
        });
    }

    findJackpotByApp(_id){
        return new Promise( (resolve, reject) => {
            AppRepository.prototype.schema.model.findById(_id)
            .populate([
                {
                    path : 'addOn',
                    model : 'AddOn',
                    select : { '__v': 0},
                    populate: [
                        {
                            path : 'jackpot',
                            model : 'Jackpot',
                            select : { '__v': 0}
                        }
                    ]
                }
            ])
            .exec( (err, app) => {
                if(err) { reject(err) }
                resolve(app.addOn.jackpot);
            });
        });
    }

    findJackpotById(_id){ 
        return new Promise( (resolve, reject) => {
            JackpotRepository.prototype.schema.model.findById(_id)
            .populate(
                [
                    {
                        path : 'resultSpace',
                        model : 'ResultSpace',
                        select : { '__v': 0}
                    }
                ]
            )
            .exec( (err, jackpot) => {
                if(err) { reject(err) }
                resolve(jackpot);
            });
        });
    }

    addBet(jackpot_id, bet){
        return new Promise( (resolve,reject) => {
            JackpotRepository.prototype.schema.model.findOneAndUpdate(
                { _id: jackpot_id, bets : {$nin : [bet._id] } },
                { $push: { "bets" : bet } },
                (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    addWinResult(jackpot_id, result){
        return new Promise( (resolve,reject) => {
            JackpotRepository.prototype.schema.model.findOneAndUpdate(
                { _id: jackpot_id },
                { $push: { "winResult" : result } },
                (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

}

JackpotRepository.prototype.schema = new JackpotSchema();

export default JackpotRepository;