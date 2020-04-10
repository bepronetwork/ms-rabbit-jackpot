import {
    registerUser,
    loginUser,
    setUser2FA,
    loginUser2FA,
    authUser
} from '../../../methods';

import Security from '../../../../src/controllers/Security/Security';
import { detectValidationErrors, mochaAsync } from '../../../utils';

import faker from 'faker';
import chai from 'chai';
import models from '../../../models';
import Random from '../../../tools/Random';
import {
    shouldntRegisterTheUser
} from "../../output/UserTestMethod";

const expect = chai.expect;

const genData = (faker, data) => JSON.parse(faker.fake(JSON.stringify(data)));

const BOILERPLATES = global.BOILERPLATES;

context('Login & Register', async () => {
    var app, user, userPostData, secret;


    before( async () =>  {
        app = global.test.app;
    });

    it('should register the User', mochaAsync(async () => {
        userPostData = genData(faker, models.users.normal_register('687678i678im' + Math.floor(Math.random() * 60) + 18, app.id, {
            username: '678im67im' + Random(10000, 23409234235463456)
        }));
        var res = await registerUser(userPostData);
        user = res.data.message;
        expect(res.data.status).to.equal(200);
    }));

    it('should´nt register the user same username', mochaAsync(async () => {
        var res = await registerUser({...userPostData, email : `somthing${Random(100,243534562345)}@gmail.com`});
        shouldntRegisterTheUser(res.data, expect);
    }));

    it('should´nt register the user same email', mochaAsync(async () => {
        var res = await registerUser({...userPostData, username : '678im67im' + Random(10000, 23409234235463456)});
        shouldntRegisterTheUser(res.data, expect);
    }));

    it('should login the User', mochaAsync(async () => {
        var res = await loginUser(userPostData);
        user.bearerToken = res.data.message.bearerToken;
        expect(res.data.status).to.equal(200);
    }));

    it('should set 2FA for the User', mochaAsync(async () => {
        let res_login = await loginUser(userPostData);
        user = res_login.data.message;

        secret = Security.prototype.generateSecret2FA({ name: 'BetProtocol', account_id: user.id });
        let token = Security.prototype.generateToken2FA(secret);
        var res = await setUser2FA({
            '2fa_secret': secret,
            '2fa_token': token,
            'user': user.id
        }, user.bearerToken, { id: user.id });
        expect(res.data.status).to.equal(200);
    }));


    it('should´t login the User with password without 2FA Login', mochaAsync(async () => {
        var res = await loginUser(userPostData);
        expect(res.data.status).to.equal(37);
    }));

    it('should login the User2FA', mochaAsync(async () => {
        let token = Security.prototype.generateToken2FA(secret);
        let res = await loginUser2FA({
            ...userPostData,
            '2fa_token': token
        });
        user = res.data.message;
        expect(res.data.status).to.equal(200);
    }));

    it('should auth for User - BearerToken', mochaAsync(async () => {
        let token = Security.prototype.generateToken2FA(secret);
        let res = await loginUser2FA({...userPostData,
            '2fa_token' : token
        });
        global.test.user = res.data.message;

        res = await authUser({
            user : user.id
        }, user.bearerToken, { id : user.id});

        expect(res.data.status).to.equal(200);
    }));

    it('should´t auth for User - BearerToken Expired', mochaAsync(async () => {
        let token = Security.prototype.generateToken2FA(secret);
        let res = await loginUser2FA({...userPostData,
            '2fa_token' : token
        });
        global.test.user = res.data.message;

        res = await authUser({
            user : user.id
        }, "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNTgwOTUyMjgwODg3LCJpYXQiOjE1ODA5NTEwMzd9.qovq5qXqzWdlSSvkx5XSTpYU5BSfaAMWvQWf1pLadcfPySw2Q0lk5WAuHoIVQlCYvXioKM86gnIpQQLKw_zAiA", { id : user.id});

        expect(res.data.status).to.equal(48);
    }));


    it('shouldn´t login the User - WRONG TOKEN', mochaAsync(async () => {
        let res = await loginUser2FA({...userPostData,
            '2fa_token' : '345633',
            'user.id' : user.id
        });
        detectValidationErrors(res);
        expect(res.data.status).to.equal(36);
    }));

    it('shouldn´t login the User - NO TOKEN', mochaAsync(async () => {
        let res = await loginUser2FA({...userPostData,
            '2fa_token' : 'null',
            'user.id' : user.id
        });
        detectValidationErrors(res);
        expect(res.data.status).to.equal(36);
    }));

    it('shouldn´t Login the User and notice the user does not exist', mochaAsync(async () => {
        var res = await loginUser(BOILERPLATES.users.UNKNOWN_USER_LOGIN);
        detectValidationErrors(res);
        expect(res.data.status).to.equal(4);
    }));

    it('shouldn´t Login the User - WRONG PASSWORD', mochaAsync(async () => {
        let res = await loginUser({...userPostData,
            'password' : 'null',
            'user.id' : user.id
        });
        detectValidationErrors(res);
        expect(res.data.status).to.equal(5);
    }));
});

