import MongoComponent from './MongoComponent';
import { TopIconSchema } from '../schemas';

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


class TopIconRepository extends MongoComponent{

    constructor(){
        super(TopIconSchema)
    }
    /**
     * @function setLogoModel
     * @param TopIcon Model
     * @return {Schema} TopIconModel
     */

    setModel = (TopIcon) => {
        return TopIconRepository.prototype.schema.model(TopIcon)
    }

    findById(_id){ 
        return new Promise( (resolve, reject) => {
            TopIconRepository.prototype.schema.model.findById(_id)
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }

    findByIdAndUpdate(_id, newStructure){
        return new Promise( (resolve,reject) => {
            TopIconRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "id"          : newStructure.id,
                } },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

}

TopIconRepository.prototype.schema = new TopIconSchema();

export default TopIconRepository;