import { LogLogic } from '../logic';
import { LogRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Log extends ModelComponent{

    constructor(params){

        let db = new LogRepository();

        super(
            {
                name : 'Log', 
                logic : new LogLogic({db : db}), 
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

export default Log;