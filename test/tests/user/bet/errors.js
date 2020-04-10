import {
    placeBet,
    getUserAuth,
    authAdmin,
    getAppAuth
} from '../../../methods';

import chai from 'chai';

import {
    shoudntBeAbleToBetLacksPayload,
    shoudntBeAbleToBetLacksBearerToken,
    shouldntBeAbleToBetInsufficientLiquidity,
    shouldntBeAbleToBetBadGame,
    shouldntBeAbleToBetBadUser,
    shouldntBeAbleToBetBadApp,
    shouldntBeAbleToBetEmptyResult,
    shouldntBeAbleToBetZeroValue,
    shouldntBeAbleToBetNegativeValue
} from '../../output/BetTestMethod';

import { mochaAsync, detectValidationErrors } from '../../../utils';
import { getRandom } from '../../../utils/math';

const expect = chai.expect;
const betAmount = 0.002;
const currencyTicker = 'ETH';
const metaName = 'linear_dice_simple';

context(`Errors ex : ${currencyTicker.toUpperCase()}`, async () =>  {
    var admin, app, user, currency, game;

    before( async () =>  {
        admin = (await authAdmin({ admin : global.test.admin.id }, global.test.admin.security.bearerToken, { id : global.test.admin.id})).data.message;
        app = (await getAppAuth({app : admin.app.id, admin: admin.id}, admin.security.bearerToken, {id : admin.id})).data.message;
        game = app.games.find( game => game.metaName == metaName);
        currency = (app.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(currencyTicker).toLowerCase())).currency;
        user = (await getUserAuth({user : global.test.user.id}, global.test.user.bearerToken, {id : global.test.user.id})).data.message;
    });

    it('shoudn´t be able to bet - lacks payload', mochaAsync(async () => {

        let postData = {  
            game: game._id,
            user: user.id,
            app: app.id,
            currency : currency._id,
            nonce: getRandom(123,2384723),
            result: [{
                place: 0, value: betAmount/3,
                place: 1, value: betAmount/3,
                place: 2, value: betAmount/3
            }]
        };

        var res = await placeBet(postData, user.bearerToken);
        detectValidationErrors(res);
        shoudntBeAbleToBetLacksPayload(res.data, expect);
    }));

    it('shoudn´t be able to bet - lacks Bearer Token', mochaAsync(async () => {
        let postData = {  
            game: game._id,
            user: user.id,
            app: app.id,
            currency : currency._id,
            nonce: getRandom(123,2384723),
            result: [{
                place: 0, value: betAmount/3,
                place: 1, value: betAmount/3,
                place: 2, value: betAmount/3
            }]
        };

        var res = await placeBet(postData, null, {id : user.id});
        detectValidationErrors(res);
        shoudntBeAbleToBetLacksBearerToken(res.data, expect);
    }));

    it('shouldn´t be able to bet - insufficient liquidity', mochaAsync(async () => {
        let postData = {  
            game: game._id,
            user: user.id,
            app: app.id,
            currency : currency._id,
            nonce: getRandom(123,2384723),
            result: [{
                place: 0, value: 10,
            }]
        };

     
        var res = await placeBet(postData, user.bearerToken, {id : user.id});
        detectValidationErrors(res);
        shouldntBeAbleToBetInsufficientLiquidity(res.data, expect);
    }));

    it('shouldn´t be able to bet - bad game', mochaAsync(async () => {
        let postData = {  
            game: 'test',
            user: user.id,
            app: app.id,
            currency : currency._id,
            nonce: getRandom(123,2384723),
            result: [{
                place: 0, value: betAmount/3,
                place: 1, value: betAmount/3,
                place: 2, value: betAmount/3
            }]
        };
        var res = await placeBet(postData, user.bearerToken, {id : user.id});
        detectValidationErrors(res);
        shouldntBeAbleToBetBadGame(res.data, expect);
    }));

    it('shouldn´t be able to bet - bad user', mochaAsync(async () => {
        let postData = {  
            game: game._id,
            user: "test",
            app: app.id,
            currency : currency._id,
            nonce: getRandom(123,2384723),
            result: [{
                place: 0, value: betAmount/3,
                place: 1, value: betAmount/3,
                place: 2, value: betAmount/3
            }]
        };
        var res = await placeBet(postData, user.bearerToken, {id : user.id});
        detectValidationErrors(res);
        shouldntBeAbleToBetBadUser(res.data, expect);
    }));

    it('shouldn´t be able to bet - bad app', mochaAsync(async () => {
        let postData = {  
            game: game._id,
            user: user.id,
            app: "test",
            currency : currency._id,
            nonce: getRandom(123,2384723),
            result: [{
                place: 0, value: betAmount/3,
                place: 1, value: betAmount/3,
                place: 2, value: betAmount/3
            }]
        };
        var res = await placeBet(postData, user.bearerToken, {id : user.id});
        detectValidationErrors(res);
        shouldntBeAbleToBetBadApp(res.data, expect);
    }));

    it('shouldn´t be able to bet - empty result', mochaAsync(async () => {
        let postData = {  
            game: game._id,
            user: user.id,
            app: app.id,
            currency : currency._id,
            nonce: getRandom(123,2384723),
            result: []
        };
        var res = await placeBet(postData, user.bearerToken, {id : user.id});
        detectValidationErrors(res);
        shouldntBeAbleToBetEmptyResult(res.data, expect);
    }));

    it('shouldn´t be able to bet - Zero Value', mochaAsync(async () => {
        let postData = {  
            game: game._id,
            user: user.id,
            app: app.id,
            currency : currency._id,
            nonce: getRandom(123,2384723),
            result: [{
                place : 0, value : 0
            }]
        };
        var res = await placeBet(postData, user.bearerToken, {id : user.id});
        detectValidationErrors(res);
        shouldntBeAbleToBetZeroValue(res.data, expect);
    }));

    it('shouldn´t be able to bet - Negative Value', mochaAsync(async () => {
        let postData = {  
            game: game._id,
            user: user.id,
            app: app.id,
            currency : currency._id,
            nonce: getRandom(123,2384723),
            result: [{
                place : 0, value : -1
            }]
        };
        var res = await placeBet(postData, user.bearerToken, {id : user.id});
        detectValidationErrors(res);
        shouldntBeAbleToBetNegativeValue(res.data, expect);
    }));

});

    