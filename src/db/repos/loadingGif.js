import MongoComponent from './MongoComponent';
import { LoadingGifSchema } from '../schemas';

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


class LoadingGifRepository extends MongoComponent{

    constructor(){
        super(LoadingGifSchema)
    }
    /**
     * @function setLogoModel
     * @param LoadingGif Model
     * @return {Schema} TopIconModel
     */

    setModel = (LoadingGif) => {
        return LoadingGifRepository.prototype.schema.model(LoadingGif)
    }

    findById(_id){ 
        return new Promise( (resolve, reject) => {
            LoadingGifRepository.prototype.schema.model.findById(_id)
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }

    findByIdAndUpdate(_id, newStructure){
        return new Promise( (resolve,reject) => {
            LoadingGifRepository.prototype.schema.model.findByIdAndUpdate(
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

LoadingGifRepository.prototype.schema = new LoadingGifSchema();

export default LoadingGifRepository; 