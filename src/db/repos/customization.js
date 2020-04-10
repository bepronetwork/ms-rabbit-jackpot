import MongoComponent from './MongoComponent';
import { CustomizationSchema } from '../schemas';

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


class CustomizationRepository extends MongoComponent{

    constructor(){
        super(CustomizationSchema)
    }
    /**
     * @function setCustomizationModel
     * @param Customization Model
     * @return {Schema} CustomizationModel
     */

    setModel = (Customization) => {
        return CustomizationRepository.prototype.schema.model(Customization)
    }

    findById(_id){ 
        return new Promise( (resolve, reject) => {
            CustomizationRepository.prototype.schema.model.findById(_id)
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }

    setColors(_id, _ids){
        return new Promise( (resolve,reject) => {
            CustomizationRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "colors" : _ids,
                } },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    setBannerId(_id, banner_id){
        return new Promise( (resolve,reject) => {
            CustomizationRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "banners" : banner_id,
                } },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    setLogoId(_id, logo_id){
        return new Promise( (resolve,reject) => {
            CustomizationRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "logo" : logo_id,
                } },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    setFooterId(_id, footer_id){
        return new Promise( (resolve,reject) => {
            CustomizationRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "footer" : footer_id,
                } },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    setTopIconId(_id, topIcon_id){
        return new Promise( (resolve,reject) => {
            CustomizationRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "topIcon" : topIcon_id,
                } },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    setLoadingGifId(_id, loadingGif_id){
        return new Promise( (resolve,reject) => {
            CustomizationRepository.prototype.schema.model.findByIdAndUpdate(
                _id, 
                { $set: { 
                    "loadingGif" : loadingGif_id,
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

CustomizationRepository.prototype.schema = new CustomizationSchema();

export default CustomizationRepository;