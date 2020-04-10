import MongoComponent from './MongoComponent';
import { LogoSchema } from '../schemas';

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


class LogoRepository extends MongoComponent{

    constructor(){
        super(LogoSchema)
    }
    /**
     * @function setLogoModel
     * @param Logo Model
     * @return {Schema} LogoModel
     */

    setModel = (Logo) => {
        return LogoRepository.prototype.schema.model(Logo)
    }

    findById(_id){ 
        return new Promise( (resolve, reject) => {
            LogoRepository.prototype.schema.model.findById(_id)
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }

    findByIdAndUpdate(_id, newStructure){
        return new Promise( (resolve,reject) => {
            LogoRepository.prototype.schema.model.findByIdAndUpdate(
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

LogoRepository.prototype.schema = new LogoSchema();

export default LogoRepository;