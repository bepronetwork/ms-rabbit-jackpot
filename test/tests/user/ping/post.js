import {
    getUserAuth,
    authAdmin,
    getAppAuth,
    pingPost
} from '../../../methods';

import chai from 'chai';

import { mochaAsync } from '../../../utils';

const expect = chai.expect;
const metaName = 'linear_dice_simple';

context(`Log post Ping`, async () =>  {
    var admin, app, user, game;

    before( async () =>  {
        admin = (await authAdmin({ admin : global.test.admin.id }, global.test.admin.security.bearerToken, { id : global.test.admin.id})).data.message;
        app = (await getAppAuth({app : admin.app.id, admin: admin.id}, admin.security.bearerToken, {id : admin.id})).data.message;
        game = app.games.find( game => game.metaName == metaName);
        // currency = (app.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(currencyTicker).toLowerCase())).currency;
        user = (await getUserAuth({user : global.test.user.id}, global.test.user.bearerToken, {id : global.test.user.id})).data.message;
    });

    it('should Post Log - admin', mochaAsync(async () => {
        var res = await pingPost({type: "admin"}, admin.bearerToken, {id : admin.id});
        expect(res.data.status).to.equals(200);
    }));

    it('should Post Log - user', mochaAsync(async () => {
        var res = await pingPost({type: "user"}, user.bearerToken, {id : user.id});
        expect(res.data.status).to.equals(200);
    }));

    // it('should Post Log - app', mochaAsync(async () => {
    //     var res = await pingPost({type: "app"}, app.bearerToken, {id : app.id})
    //     expect(res.data.status).to.equals(200);
    // }));

    it('should Post Log - global', mochaAsync(async () => {
        var res = await pingPost({type: "global"}, {}, {});
        expect(res.data.status).to.equals(200);
    }));

    it('should Post Log - Empty', mochaAsync(async () => {
        var res = await pingPost({type: "error"}, {}, {});
        expect(res.data.status).to.not.equals(200);
        expect(res.data.status).to.equals(404);
    }));

});