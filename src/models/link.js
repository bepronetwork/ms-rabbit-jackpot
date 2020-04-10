import { LinkLogic } from '../logic';
import { LinkRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Link extends ModelComponent{

    constructor(params){

        let db = new LinkRepository();

        super(
            {
                name : 'Link', 
                logic : new LinkLogic({db : db}), 
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

export default Link;