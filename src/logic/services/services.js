import { globals } from "../../Globals";
import Axios from "axios";
import EtherscanSingleton from "../etherscan/etherscan";
import Numbers from "./numbers";
import { CONFIRMATION_NEEDED } from "../../config";
import delay from 'delay';

let services = {
    application : {
        101 : {
            name : 'casino',
            widgets : [201]
        }
    },
    widgets : {
        201 : {name : 'crypto'}
    }
}



let getServices = (servicesArray) => {
    let returnServices = [];
    for(var i = 0; i < servicesArray.length; i++){
        let service = parseInt(servicesArray[i]);
        let applications = Object.keys(services.application).map( (key, index) => {
            if(parseInt(key) == service){
                return service;
            }
        })
        let widgets = Object.keys(services.widgets).map( (key, index) => {
            if(parseInt(key) == service){
                return service;
            }
        })

        returnServices = returnServices.concat(applications).concat(widgets).filter((el) => el != null );
    }
    return returnServices;
}


function fromBigNumberToInteger(value, decimals=18){
    return value/ Math.pow(10, decimals)*1000000000000000000;
}

function fromDecimals(value, decimals){
    return value/10**decimals
}

function fromExponential(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }



async function verifytransactionHashDirectDeposit(currency, transactionHash, amount, platformAddress, decimals){
    try{
        switch(currency){
            /* If Ethereum */
            case 'eth' : {
                let res_transaction = await globals.web3.eth.getTransaction(transactionHash);
                let res_transaction_recipt = await globals.web3.eth.getTransactionReceipt(transactionHash);
                let blockNumber = await globals.web3.eth.getBlockNumber();
                let confirmedCondition = () => ((blockNumber - res_transaction_recipt.blockNumber) < CONFIRMATION_NEEDED);
                if(!res_transaction_recipt || !res_transaction){throw new Error()}

                while(confirmedCondition()){
                    await delay(2*1000);
                    /* Get Information of this transactionHash */
                    blockNumber = await globals.web3.eth.getBlockNumber();
                    res_transaction = await globals.web3.eth.getTransaction(transactionHash);
                    res_transaction_recipt = await globals.web3.eth.getTransactionReceipt(transactionHash);
                }

                if((blockNumber - res_transaction_recipt.blockNumber) < CONFIRMATION_NEEDED){throw new Error()}
                
                let res_transaction_decoded = {
                    from : res_transaction_recipt.from,
                    tokensTransferedTo : res_transaction.to,
                    status : res_transaction_recipt.status,
                    blockHash : res_transaction.blockHash,
                    amount : res_transaction.value
                }
                
                /* Verify if receiver of Transaction is platformAddress */
                if(new String(res_transaction_decoded.tokensTransferedTo).toLowerCase() != new String(platformAddress).toLowerCase()){
                    throw false;
                }

                /* If confirmed it was mined and not reverted */
                if(!res_transaction_recipt.status || !res_transaction.blockHash){
                    throw false;
                }
                return {
                    isValid : true,
                    from :  res_transaction.from,
                    amount : parseFloat(globals.web3.utils.fromWei(new String(res_transaction_decoded.amount).toString()))
                };
            }
            /* If Other ERC-20 Token */
            default : {
                let res_transaction = await globals.web3.eth.getTransaction(transactionHash);
                let res_transaction_recipt = await globals.web3.eth.getTransactionReceipt(transactionHash);
                let blockNumber = await globals.web3.eth.getBlockNumber();
                let confirmedCondition = () => ((blockNumber - res_transaction_recipt.blockNumber) < CONFIRMATION_NEEDED);
                if(!res_transaction_recipt || !res_transaction){throw new Error()}
                while(confirmedCondition()){
                    await delay(2*1000);
                    /* Get Information of this transactionHash */
                    blockNumber = await globals.web3.eth.getBlockNumber();
                    res_transaction = await globals.web3.eth.getTransaction(transactionHash);
                    res_transaction_recipt = await globals.web3.eth.getTransactionReceipt(transactionHash);
                }

                if((blockNumber - res_transaction_recipt.blockNumber) < CONFIRMATION_NEEDED){throw new Error()}
                
                let res_transaction_decoded = EtherscanSingleton.getTransactionDataERC20(res_transaction);
                /* Verify if receiver of Transaction is platformAddress */
                if(new String(res_transaction_decoded.tokensTransferedTo).toLowerCase() != new String(platformAddress).toLowerCase()){
                    throw false;
                }

                /* If confirmed it was mined and not reverted */
                if(!res_transaction_recipt.status || !res_transaction.blockHash){
                    throw false;
                }
                
                /* Verify if the Token Amount is the same */
                if(
                    Numbers.fromExponential(new Number(res_transaction_decoded.tokenAmount)) 
                    != Numbers.toSmartContractDecimals(new Number(amount), decimals)){
                    throw new Error("Amount is Wrong");
                }

                return {
                    isValid : true,
                    from :  res_transaction.from,
                    amount : Numbers.fromDecimals(Numbers.fromExponential(new Number(res_transaction_decoded.tokenAmount)), decimals)
                };
            }
        }
    }catch(err){
        console.log(err)
        return {
            isValid : false
        };
    }
}

function generateRandomID(){
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 9);
};
export {
    services,
    generateRandomID,
    getServices,
    verifytransactionHashDirectDeposit,
    fromDecimals,
    fromExponential,
    fromBigNumberToInteger
}