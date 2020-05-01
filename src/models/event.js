import {EventsLogic} from '../logic';
import ModelComponent from './modelComponent';
import {EventsRepository} from '../db/repos';

class Event extends ModelComponent{

    constructor(params){

        let db = new EventsRepository();

        super(
            {
                name : 'Event', 
                logic : new EventsLogic({db : db}), 
                db : db,
                self : null, 
                params : params
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
    
    async resolve(){
        try{
            return await this.process('Resolve');
        }catch(err){
            throw err;
        }
    } 

}

export default Event;