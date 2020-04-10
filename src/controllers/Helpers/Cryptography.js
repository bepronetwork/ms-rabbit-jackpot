import { globals } from "../../Globals";
import Numbers from "../../logic/services/numbers";

var SHA512 = require("crypto-js/hmac-sha512");
var SHA512_HASH = require("crypto-js/sha512");
var randomstring = require("randomstring");
const fortuna = require('javascript-fortuna');
const si = require('systeminformation');
const sha512 = require('js-sha512');
var entropyVal = sha512(`${JSON.stringify(randomstring.generate())}`);

function entropyAccumFunction() {
    return new Promise(async (resolve) => {
        const cpuSpeed = await si.cpu();
        const processes = await si.processes();
        const disksIO = await si.disksIO();
        const memory = await si.mem();
        entropyVal = sha512(`${JSON.stringify(cpuSpeed)}:${JSON.stringify(processes)}:${JSON.stringify(disksIO)}:${JSON.stringify(memory)}`);
        resolve();
    });
}
  
function entropyFunction() {
    return entropyVal;
}
  
let entropyInterval = setInterval(async () => {
    await entropyAccumFunction();
}, 250);

fortuna.init({ timeBasedEntropy: true, accumulateTimeout: 100, entropyFxn: entropyFunction });

setTimeout(() => {
    fortuna.stopTimer();
    clearInterval(entropyInterval);
}, 5000);

class Cryptography{

    constructor(){
    
    }

    generateSeed(){
        const number = fortuna.random();
        return parseInt(number*Math.pow(2, 53)).toString(16);
    }

    hashSeed(seed){
        return SHA512_HASH(seed);
    }

    generateNonce(){
        return Math.floor(Math.random() * 10000000000000000) + 1;
    }

    generateRandomResult(server_seed, client_seed, nonce){
        let randomHex = SHA512(server_seed, client_seed);
        return randomHex;

    }

    hexToInt = (randomHex) => {
        let hexString = randomHex.toString().substring(0, 13);
        let decimal = parseInt(hexString, 16)/(Math.pow(2, 52));
        return decimal*100;
    }

    generatePrivateKey = () => {
        return '0x' + randomstring.generate({
            charset: 'hex',
            length : 64
        });
    }


    getUserSignature({clientAccount, winBalance, nonce, category, decimals}){
        
        let message =  globals.web3.utils.soliditySha3(
            {type: 'int128', value :  Numbers.fromExponential(Numbers.toSmartContractDecimals(winBalance, decimals))},
            {type: 'uint128', value: nonce},
            {type: 'uint8', value: category}
        );
    
        let response = clientAccount.getAccount().sign(message, clientAccount.getPrivateKey());

        return {
            signature : response,
            nonce,
            category,
            address : clientAccount.getAddress()
        };
    }

}

let CryptographySingleton = new Cryptography();

export default CryptographySingleton;