import {BetLogic} from '../logic';
import ModelComponent from './modelComponent';
import {BetsRepository} from '../db/repos';
import { isCasino } from '../logic/markets/betSystems';
import { MapperBetSingleton } from "../controllers/Mapper";

class Bet extends ModelComponent{

    constructor(params){

        let db = new BetsRepository();

        super(
            {
                name : 'Bet', 
                logic : new BetLogic({db : db}), 
                db : db,
                self : null, 
                params : params
            }
            );
    }

    async register(){
        try{
            let res = await this.process('Auto');
            return MapperBetSingleton.output('Bet', res);
        }catch(err){
            throw err;
        }
    }

    async save(){
        try{
            let res = await this.process('Register');
            return res;
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

export default Bet;