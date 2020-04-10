import { CryptographySingleton } from "../../../src/controllers/Helpers";
import account from "../../logic/eth/models/account";
import { globalsTest } from "../../GlobalsTest";
import { getUserSignature } from "../../utils/eth";

const create_bet = (user, app, game) => {
    let pk = CryptographySingleton.generatePrivateKey();
    let params = {
        clientAccount : new account(globalsTest.web3, globalsTest.web3.eth.accounts.privateKeyToAccount(pk)) ,
        nonce : getRandom(100, 50000000),
        betAmount : getRandom(2, 65),
        result : getRandomBetResult(game),   
        category : 1 // Bet
    };
    let {signature, nonce} = getUserSignature(params);

    return {
        user,
        app,
        nonce,
        betAmount : 10,
        game,
        signature : {
            "v" : signature.v,
            "r" : signature.r,
            "s" : signature.s
        },
        result : [0]
    } 
}
export default create_bet;



function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomBetResult(game){
    let indexes = [];

    if(game.cumulative){
        let cycle = getRandom(game.min, game.max);
        for(var i = 0; i < cycle; i++){
            indexes.push(getRandom(game.min, game.max))
        }
        // Combined Bets
    }else{
        indexes.push(getRandom(game.min, game.max))
    }
    return indexes;
}