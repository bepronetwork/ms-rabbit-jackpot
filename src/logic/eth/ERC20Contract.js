import contract from "./models/contract";
import {
    ierc20
} from './interfaces';
import Numbers from "../services/numbers";

const options = {
    token_amount : 1000000000 ,
    decimals : 18
}

let self;


class ERC20TokenContract{

    constructor(params){
        self = {
            contract : 
                new contract({
                    web3 : params.web3,
                    contract : ierc20, 
                    address : params.contractAddress
            }),
            ...params
        }

     
    }

    __assert(){
        self.contract.use(
            ierc20,
            self.contractAddress);
    }

    async __init__(){
        let contractDepolyed = await this.deploy();
        // Start Contract use
        this.__assert(contractDepolyed);
    }

    getContract(){
        return self.contract.getContract();
    }

    getAddress(){
        return self.contract.getAddress();
    }

    getTotalTokenAmount(){
        return options.token_amount;
    }

    async getTokenAmount(address){
        return await self.contract.getContract().methods.balanceOf(address).call();
    }

    getABI(){
        return self.contract;
    }
    
}



export default ERC20TokenContract;