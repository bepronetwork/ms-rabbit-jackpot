import MongoComponent from './MongoComponent';
import { ColorSchema } from '../schemas';

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


class ColorRepository extends MongoComponent{

    constructor(){
        super(ColorSchema)
    }
    /**
     * @function setColorModel
     * @param Color Model
     * @return {Schema} ColorModel
     */

    setModel = (Color) => {
        return ColorRepository.prototype.schema.model(Color)
    }

    findById(_id){ 
        return new Promise( (resolve, reject) => {
            ColorRepository.prototype.schema.model.findById(_id)
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }

    findByIdAndUpdate(_id, newStructure){
        return new Promise( (resolve,reject) => {
            ColorRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "type"          : newStructure.type,
                    "hex"           : newStructure.hex
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

ColorRepository.prototype.schema = new ColorSchema();

export default ColorRepository;