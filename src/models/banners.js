import { BannersLogic } from '../logic';
import { BannersRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Banners extends ModelComponent{

    constructor(params){

        let db = new BannersRepository();

        super(
            {
                name : 'Banners', 
                logic : new BannersLogic({db : db}), 
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

export default Banners;