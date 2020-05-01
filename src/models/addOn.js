import { AddOnLogic } from '../logic';
import { AddOnRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class AddOn extends ModelComponent{

    constructor(params){

        let db = new AddOnRepository();

        super(
            {
                name : 'AddOn', 
                logic : new AddOnLogic({db : db}), 
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

export default AddOn;