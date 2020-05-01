import { ColorLogic } from '../logic';
import { ColorRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Color extends ModelComponent{

    constructor(params){

        let db = new ColorRepository();

        super(
            {
                name : 'Color', 
                logic : new ColorLogic({db : db}), 
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

export default Color;