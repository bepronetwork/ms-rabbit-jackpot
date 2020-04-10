import MongoComponent from './MongoComponent';
import { TokenSchema } from '../schemas';

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


class TokenRepository extends MongoComponent{

    constructor(){
        super(TokenSchema)
    }
    /**
     * @function setLogoModel
     * @param Token Model
     * @return {Schema} TokenModel
     */

    setModel = (Token) => {
        return TokenRepository.prototype.schema.model(Token)
    }

    findById(_id){ 
        return new Promise( (resolve, reject) => {
            TokenRepository.prototype.schema.model.findById(_id)
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }

    findByToken(token){ 
        return new Promise( (resolve, reject) => {
            TokenRepository.prototype.schema.model.findOne({token})
            .exec( (err, item) => {
                if(err) { reject(err)}
                resolve(item);
            });
        });
    }

}

TokenRepository.prototype.schema = new TokenSchema();

export default TokenRepository;