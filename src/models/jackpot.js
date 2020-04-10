import { JackpotLogic } from '../logic';
import { JackpotRepository } from '../db/repos';
import ModelComponent from './modelComponent';

class Jackpot extends ModelComponent{

    constructor(params){

        let db = new JackpotRepository();

        super(
            {
                name : 'Jackpot',
                logic : new JackpotLogic({db : db}),
                db : db,
                self : null,
                params : params,
                children : [
                ]
            }
            );
    }

    async editEdgeJackpot(){
        try{
            return await this.process('EditEdgeJackpot');
        }catch(err){
            throw err;
        }
    }

    async register(){
        try{
            return await this.process('Register');
        }catch(err){
            throw err;
        }
    }

    async normalizeSpaceResult(){
        try{
            return await this.process('NormalizeSpaceResult');
        }catch(err){
            throw err;
        }
    }

    async percentage(){
        try{
            return await this.process('Percentage');
        }catch(err){
            throw err;
        }
    }

    async bet(){
        try{
            return await this.process('Bet');
        }catch(err){
            throw err;
        }
    }

}

export default Jackpot;