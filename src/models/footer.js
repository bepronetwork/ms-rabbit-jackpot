import { FooterLogic } from '../logic';
import { FooterRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Footer extends ModelComponent{

    constructor(params){

        let db = new FooterRepository();

        super(
            {
                name : 'Footer', 
                logic : new FooterLogic({db : db}), 
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

export default Footer;