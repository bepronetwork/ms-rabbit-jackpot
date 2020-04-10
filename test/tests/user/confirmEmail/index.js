import {
    registerUser,
    loginUser,
    confirmEmail,
    resendEmail
} from '../../../methods';

import { mochaAsync } from '../../../utils';

import faker from 'faker';
import chai from 'chai';
import models from '../../../models';
import Random from '../../../tools/Random';
import MiddlewareSingleton from '../../../../src/api/helpers/middleware';

const expect = chai.expect;

const genData = (faker, data) => JSON.parse(faker.fake(JSON.stringify(data)));

context('Confirm Email', async () => {
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
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(200);
    }));

    it('should resend email to confirm', mochaAsync(async () => {
        const userLocal = await loginUser(userPostData);
        console.log(userLocal.data.message.bearerToken);
        const res = await resendEmail({user: userLocal.data.message.id}, userLocal.data.message.bearerToken, {id : userLocal.data.message.id});

        expect(userLocal.data.status).to.not.null;
        expect(userLocal.data.status).to.equal(200);
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(200);
    }));

    it('should Confirm Email', mochaAsync(async () => {
        const res = await confirmEmail({
            token   : MiddlewareSingleton.generateTokenEmail(user.email)
        });
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(200);
    }));

    it('should no Confirm Email With Token Invalid', mochaAsync(async () => {
        const res = await confirmEmail({
            token   : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNTgwOTUyMjgwODg3LCJpYXQiOjE1ODA5NTEwMzd9.qovq5qXqzWdlSSvkx5XSTpYU5BSfaAMWvQWf1pLadcfPySw2Q0lk5WAuHoIVQlCYvXioKM86gnIpQQLKw_zAiA'
        });
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(49);
    }));


});

