import { LoadingGifLogic } from '../logic';
import { LoadingGifRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class LoadingGif extends ModelComponent{

    constructor(params){

        let db = new LoadingGifRepository();

        super(
            {
                name : 'LoadingGif', 
                logic : new LoadingGifLogic({db : db}), 
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

export default LoadingGif;