import { Mongoose } from "mongoose";
import Web3 from 'web3';
import CasinoContract from "./logic/eth/CasinoContract";
import interfaces from "./logic/eth/interfaces";
import ERC20TokenContract from "./logic/eth/ERC20Contract";
import { ETH_NETWORK, ETH_NET_NAME, DB_MONGO } from './config';
import { IPRunning } from "./helpers/network";
import { Logger } from "./helpers/logger";
import bluebird from 'bluebird';
import { BitGoSingleton } from "./logic/third-parties";

class Globals{
    constructor(){
        this.web3 = new Web3(new Web3.providers.HttpProvider(ETH_NETWORK.url));
    }

    async __init__(){
        /* Init BitGo */
        await BitGoSingleton.__init__();
        /* Init Mongo */
        await this.startDatabase();
    }

    verify(){
        //Display All and Confirm Running
        globals.log();
    }

    getCasinoContract(address, tokenAddress){
        return new CasinoContract({
            web3 : this.web3,
            contractDeployed : interfaces.casino,
            erc20TokenContract : tokenAddress,
            contractAddress : address
        })
    }

    getERC20Contract(tokenAddress){
        let erc20Contract = new ERC20TokenContract({
            web3 : this.web3,
            contractAddress : tokenAddress,
            accountPrivateKey : ETH_NETWORK.keys.home,
        });

        erc20Contract.__assert(
            {
                contractAddress : tokenAddress,
                contract_name : 'IERC20Token' 
            }
        );

        return erc20Contract;
    }

    newCasinoContract(params){
        return new CasinoContract({
            web3 : this.web3,
            contractDeployed : CONSTANTS.casino,
            erc20TokenContract : params.tokenAddress,
            tokenTransferAmount : params.tokenTransferAmount
        })
    }

    
    set(item, value){
        Object.defineProperty(this, item, value);
    }

    get(item){
        if( Object.getOwnPropertyDescriptor(this, item) ) {
            return this.mongo[item];
        }else{
            throw new Error("Key does not exist");
        }
    }
    
    log(){
        Logger.info(`ETH`, `${ETH_NET_NAME}`);
        Logger.info(`IP`, `${IPRunning()}`);
    }

    async startDatabase(){
        // Main DB
        this.main_db = new Mongoose();
        this.main_db.set('useFindAndModify', false);
        await this.main_db.connect(DB_MONGO.connection_string + DB_MONGO.dbs.main, { useNewUrlParser: true, useUnifiedTopology: true});
        this.main_db.Promise = bluebird;
        // Ecosystem DB
        this.ecosystem_db = new Mongoose();
        this.ecosystem_db.set('useFindAndModify', false);
        await this.ecosystem_db.connect(DB_MONGO.connection_string + DB_MONGO.dbs.ecosystem, { useNewUrlParser: true, useUnifiedTopology: true});
        this.ecosystem_db.Promise = bluebird;
        // Main DB
        this.default = new Mongoose();
        this.default.Promise = bluebird;
        return true;
    }
}

let globals = new Globals(); // Singleton

export {
    globals
}
