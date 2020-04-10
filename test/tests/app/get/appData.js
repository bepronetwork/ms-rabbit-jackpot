import {
    getApp,
    authAdmin,
    getAppAuth,
    getAppSummary,
    getAppLastBets,
    getAppUsers,
    getAppBiggestBetWinners,
    getAppBiggestUserWinners,
    getAppPopularNumbers} from '../../../methods';

import chai from 'chai';
import models from '../../../models';

import {
    GETPopularNumbersShouldAllow,
    GETAppDATAShouldForbidTheAccess,
    GETBESTDATAShouldAllow,
    GETBESTDATAShouldForbidTheAccess,
    GETBiggestBetWinnersShouldAllow,
    GETBiggestUserWinnersShouldAllow,
    GETGAMESDATAShouldAllow,
    GETGAMESDATAShouldForbidTheAccess,
    GETLastBetsShouldAllow,
    GETREVENUEDATAShouldAllow,
    GETREVENUEDATAShouldForbidTheAccess,
    GETUSERSDATAShouldAllow,
    GETUSERSDATAShouldForbidTheAccess,
    shouldGetAppData,
    GETUsersShouldAllow,
    GETWALLETDATAShouldAllow,
    GETWALLETDATAShouldForbidTheAccess
} from '../../output/AppTestMethod';
import { mochaAsync } from '../../../utils';

const expect = chai.expect;
const ticker = 'ETH'


context('App Data', async () =>  {
    var admin, app, currency;


    before( async () =>  {
        admin = (await authAdmin({ admin : global.test.admin.id }, global.test.admin.security.bearerToken, { id : global.test.admin.id})).data.message;
        app = (await getAppAuth({app : admin.app.id, admin: admin.id}, admin.security.bearerToken, {id : admin.id})).data.message;
        currency = (app.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(ticker).toLowerCase())).currency;
    });

    it('should Get App Data', mochaAsync(async () => {
        let get_app_model = models.apps.get_app(app.id);
        let res = await getApp(get_app_model);
        shouldGetAppData(res.data, expect);
    })); 


    it('GET App DATA - should forbid the access', mochaAsync(async () => {
        let get_app_model = models.apps.get_app(app.id);
        let res = await getAppAuth(get_app_model);
        GETAppDATAShouldForbidTheAccess(res.data, expect);
    })); 


    it('GET USERS DATA - should forbid the access', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'USERS', 'weekly', currency._id);
        let res = await getAppSummary(users_call_model);
        GETUSERSDATAShouldForbidTheAccess(res.data, expect);
    })); 

    it('GET REVENUE DATA - should forbid the access ', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'REVENUE', 'weekly', currency._id);
        let res = await getAppSummary(users_call_model);
        GETREVENUEDATAShouldForbidTheAccess(res.data, expect);
    })); 

    it('GET GAMES DATA - should forbid the access ', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'GAMES', 'weekly', currency._id);
        let res = await getAppSummary(users_call_model);
        GETGAMESDATAShouldForbidTheAccess(res.data, expect);
    })); 

    it('GET BEST DATA - should forbid the access ', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'BETS', 'weekly', currency._id);
        let res = await getAppSummary(users_call_model);
        GETBESTDATAShouldForbidTheAccess(res.data, expect);
    })); 

    it('GET WALLET DATA - should forbid the access ', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'WALLET', 'weekly',currency._id);
        let res = await getAppSummary(users_call_model);
        GETWALLETDATAShouldForbidTheAccess(res.data, expect);
    })); 

    
    it('GET users - should allow', mochaAsync(async () => {
        let postData = {
            app : app.id,
            currency : currency._id
        };
        let res = await getAppUsers({...postData, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        GETUsersShouldAllow(res.data, expect);
    }));

    it('GET last Bets - should allow', mochaAsync(async () => {
        let postData = {
            app : app.id,
            size : 30,
            currency : currency._id
        };
        let res = await getAppLastBets(postData);
        GETLastBetsShouldAllow(res.data, expect);
    }));

    it('GET Biggest Bet Winners - should allow', mochaAsync(async () => {
        let postData = {
            app : app.id,
            size : 30,
            currency : currency._id
        };
        let res = await getAppBiggestBetWinners(postData);
        GETBiggestBetWinnersShouldAllow(res.data, expect);
    }))

    it('GET Biggest User Winners - should allow', mochaAsync(async () => {
        let postData = {
            app : app.id,
            size : 30,
            currency : currency._id
        };
        let res = await getAppBiggestUserWinners(postData);
        GETBiggestUserWinnersShouldAllow(res.data, expect);
    }))

    it('GET Popular Numbers - should allow', mochaAsync(async () => {
        let postData = {
            app : app.id
        };
        let res = await getAppPopularNumbers(postData);
        GETPopularNumbersShouldAllow(res.data, expect);
    }))
            
    it('GET USERS DATA - should allow', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'USERS', 'weekly', currency._id);
        let res = await getAppSummary({...users_call_model, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        GETUSERSDATAShouldAllow(res.data, expect);
    })); 

    it('GET REVENUE DATA - should allow', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'REVENUE', 'weekly', currency._id);
        let res = await getAppSummary({...users_call_model, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        GETREVENUEDATAShouldAllow(res.data, expect);
    })); 

    it('GET GAMES DATA - should allow', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'GAMES', 'weekly', currency._id);
        let res = await getAppSummary({...users_call_model, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        GETGAMESDATAShouldAllow(res.data, expect);
    })); 

    it('GET BEST DATA - should allow', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'BETS', 'weekly', currency._id);
        let res = await getAppSummary({...users_call_model, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        GETBESTDATAShouldAllow(res.data, expect);
    })); 

    it('GET WALLET DATA - should allow', mochaAsync(async () => {
        let users_call_model = models.apps.get_summary(app.id, 'WALLET', 'weekly', currency._id);
        let res = await getAppSummary({...users_call_model, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        GETWALLETDATAShouldAllow(res.data, expect);
    }));
});
