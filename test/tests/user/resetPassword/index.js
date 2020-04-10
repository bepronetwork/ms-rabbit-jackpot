import {
    registerUser,
    resetPassword,
    setPassword
} from '../../../methods';

import { mochaAsync } from '../../../utils';

import faker from 'faker';
import chai from 'chai';
import models from '../../../models';
import Random from '../../../tools/Random';

const expect = chai.expect;

const genData = (faker, data) => JSON.parse(faker.fake(JSON.stringify(data)));

context('Reset Password', async () => {
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

    it('should Reset Password With Username', mochaAsync(async () => {
        const res = await resetPassword({username_or_email : user.username});
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(200);
    }));

    it('should Reset Password With Email', mochaAsync(async () => {
        const res = await resetPassword({username_or_email : user.email});
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(200);
    }));

    it('should Reset Password With Username Invalid', mochaAsync(async () => {
        const res = await resetPassword({username_or_email : user.username + "1"});
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(55);
    }));

    it('should Reset Password With Email Invalid', mochaAsync(async () => {
        const res = await resetPassword({username_or_email : user.email + "1"});
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(55);
    }));
    it('should Set Password With Token Invalid', mochaAsync(async () => {
        const res = await setPassword({
            user_id : user._id,
            token   : "asdasdasdasdasdasd",
            password: "123123"
        });
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(49);
    }));
    it('should Set Password With Token Expired', mochaAsync(async () => {
        const res = await setPassword({
            user_id : user._id,
            token   : "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNTgwOTUyMjgwODg3LCJpYXQiOjE1ODA5NTEwMzd9.qovq5qXqzWdlSSvkx5XSTpYU5BSfaAMWvQWf1pLadcfPySw2Q0lk5WAuHoIVQlCYvXioKM86gnIpQQLKw_zAiA",
            password: "123123"
        });
        expect(res.data.status).to.not.null;
        expect(res.data.status).to.equal(48);
    }));


});

