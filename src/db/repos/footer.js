import MongoComponent from './MongoComponent';
import { FooterSchema } from '../schemas';

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


class FooterRepository extends MongoComponent{

    constructor(){
        super(FooterSchema)
    }
    /**
     * @function setFooterModel
     * @param Footer Model
     * @return {Schema} FooterModel
     */

    setModel = (Footer) => {
        return FooterRepository.prototype.schema.model(Footer)
    }

    findById(_id){ 
        return new Promise( (resolve, reject) => {
            FooterRepository.prototype.schema.model.findById(_id)
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }


    findByIdAndUpdate(_id, newStructure){
        return new Promise( (resolve,reject) => {
            FooterRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "communityLinks"           : newStructure.communityLinks,
                    "supportLinks"             : newStructure.supportLinks
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

FooterRepository.prototype.schema = new FooterSchema();

export default FooterRepository;