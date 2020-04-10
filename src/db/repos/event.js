import MongoComponent from './MongoComponent';
import { EventSchema } from '../schemas';
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


const foreignKeys = ['resultSpace'];

class EventsRepository extends MongoComponent{

    constructor(){
        super(EventSchema)
    }
    /**
     * @function setEventModel
     * @param Event Model
     * @return {Schema} EventModel
     */

    setModel = (bet) => {
        return EventsRepository.prototype.schema.model(bet)
    }

    resolveEvent(_id, params){
        return new Promise( (resolve,reject) => {
            EventsRepository.prototype.schema.model.findByIdAndUpdate(
                { _id: _id, isResolved : { $eq : false } }, 
                { $set: 
                    { 
                        result              : params.result,
                        isResolved          : true
                }},{ new: true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    addBet(_id, bet){
        return new Promise( (resolve,reject) => {
            EventsRepository.prototype.schema.model.findOneAndUpdate(
                { _id: _id, bets : {$nin : [bet._id] } }, 
                { $push: { "bets" : bet } },
                (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }
    
    findEventById(_id){ 
        return new Promise( (resolve, reject) => {
            EventsRepository.prototype.schema.model.findById(_id)
            .populate(foreignKeys)
            .exec( (err, Event) => {
                if(err) { reject(err)}
                resolve(Event);
            });
        });
    }


    getAll = async() => {
        return new Promise( (resolve,reject) => {
            EventsRepository.prototype.schema.model.find().lean().populate(foreignKeys)
            .exec( (err, docs) => {
                if(err){reject(err)}
                resolve(docs);
            })
        })
    }
}


export default EventsRepository;