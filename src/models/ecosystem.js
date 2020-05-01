import {EcosystemLogic} from '../logic';
import ModelComponent from './modelComponent';
import { MapperGetEcosystemDataSingleton, MapperGetCasinoGamesSingleton } from "../controllers/Mapper";

class Ecosystem extends ModelComponent{

    constructor(params){

        let db = null;

        super(
            {
                name : 'Ecosystem', 
                logic : new EcosystemLogic({db : db}), 
                db : db,
                self : null, 
                params : params,
                children : [ ]
            }
            );
    }
     
     /**
     * @param {String} 
     * @return {bool || Exception}  
     */


    async getEcosystemData(){
        try{
            let res = await this.process('GetEcosystemData');
            return MapperGetEcosystemDataSingleton.output('GetEcosystemData', res);
        }catch(err){
            throw err;
        }
    }

     
     /**
     * @param {String} 
     * @return {bool || Exception}  
     */


    async getCasinoGames(){
        try{
            let res = await this.process('GetCasinoGames');
            return MapperGetCasinoGamesSingleton.output('GetCasinoGames', res);
        }catch(err){
            throw err;
        }
    }

    
}

export default Ecosystem;
