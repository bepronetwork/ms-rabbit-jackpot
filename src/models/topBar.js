import { TopBarLogic } from '../logic';
import { TopBarRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class TopBar extends ModelComponent{

    constructor(params){

        let db = new TopBarRepository();

        super(
            {
                name : 'TopBar', 
                logic : new TopBarLogic({db : db}), 
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

export default TopBar;