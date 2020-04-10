import { TopIconLogic } from '../logic';
import { TopIconRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class TopIcon extends ModelComponent{

    constructor(params){

        let db = new TopIconRepository();

        super(
            {
                name : 'TopIcon', 
                logic : new TopIconLogic({db : db}), 
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

export default TopIcon;