import { MailSenderLogic } from '../logic';
import { MailSenderRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class MailSender extends ModelComponent{

    constructor(params){

        let db = new MailSenderRepository();

        super(
            {
                name : 'MailSender', 
                logic : new MailSenderLogic({db : db}), 
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

export default MailSender;