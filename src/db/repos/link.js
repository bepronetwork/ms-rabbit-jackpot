import MongoComponent from './MongoComponent';
import { LinkSchema } from '../schemas';

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


class LinkRepository extends MongoComponent{

    constructor(){
        super(LinkSchema)
    }
    /**
     * @function setLinkModel
     * @param Link Model
     * @return {Schema} LinkModel
     */

    setModel = (Link) => {
        return LinkRepository.prototype.schema.model(Link)
    }

    findById(_id){ 
        return new Promise( (resolve, reject) => {
            LinkRepository.prototype.schema.model.findById(_id)
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }

    findByIdAndUpdate(_id, newStructure){
        return new Promise( (resolve,reject) => {
            LinkRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "href"           : newStructure.href,
                    "name"           : newStructure.name
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

LinkRepository.prototype.schema = new LinkSchema();

export default LinkRepository;