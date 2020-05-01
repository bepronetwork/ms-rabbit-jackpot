import { TypographyLogic } from '../logic';
import { TypographyRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Typography extends ModelComponent{

    constructor(params){

        let db = new TypographyRepository();

        super(
            {
                name : 'Typography', 
                logic : new TypographyLogic({db : db}), 
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

export default Typography;