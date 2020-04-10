import { LogoLogic } from '../logic';
import { LogoRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Logo extends ModelComponent{

    constructor(params){

        let db = new LogoRepository();

        super(
            {
                name : 'Logo', 
                logic : new LogoLogic({db : db}), 
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

export default Logo;