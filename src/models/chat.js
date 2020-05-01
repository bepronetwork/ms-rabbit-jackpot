import { ChatLogic } from '../logic';
import { ChatRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Chat extends ModelComponent{

    constructor(params){

        let db = new ChatRepository();

        super(
            {
                name : 'Chat', 
                logic : new ChatLogic({db : db}), 
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

export default Chat;