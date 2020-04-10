import { TokenLogic } from '../logic';
import { TokenRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Token extends ModelComponent{

    constructor(params){

        let db = new TokenRepository();

        super(
            {
                name : 'Token', 
                logic : new TokenLogic({db : db}), 
                db : db,
                self : null, 
                params : params,
                children : []
            }
            );
    }

    async register(){
        try{
            return await this.process('Register');
        }catch(err){
            throw err;
        }
    }
}

export default Token;