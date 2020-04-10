import { getRandomBetResult, getRandom } from "../../utils/math";


const create_bet = ({user_id, app_id, game, betAmount}) => {
    let params = {
        game : game._id,
        nonce : getRandom(100, 50000000),
        betAmount : getRandom(2, 65),
        result : getRandomBetResult({game, betAmount}),   
        category : 1 // Bet
    };

    return {
        game : params.game,
        user : user_id,
        app : app_id,
        nonce : params.nonce,
        result : params.result
    } 
}
export default create_bet;

