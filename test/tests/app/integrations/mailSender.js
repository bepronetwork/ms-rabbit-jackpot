import {
    editAppMailSenderIntegration,
    registerUser,
    loginUser,
    registerAdmin
} from '../../../methods';
import chai from 'chai';
import models from '../../../models';
import { mochaAsync, detectValidationErrors } from '../../../utils';
import Random from '../../../tools/Random';
import faker from 'faker';
const genData = (faker, data) => JSON.parse(faker.fake(JSON.stringify(data)));

const BOILERPLATES = global.BOILERPLATES;
const expect = chai.expect;

context('Mail Sender', async () =>  {
    var app, admin, user, userPostData, secret;


    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });

    it('should register the User with SendInBlue API Key - Null', mochaAsync(async () => {
        userPostData = genData(faker, models.users.normal_register('687678i678im' + Math.floor(Math.random() * 60) + 18, app.id, {
            username: '678im67im' + Random(10000, 23409234235463456)
        }));
        var res = await registerUser(userPostData);
        user = res.data.message;
        expect(res.data.status).to.equal(200);
    }));

    it('should login the User with SendInBlue API Key - Null', mochaAsync(async () => {
        var res = await loginUser(userPostData);
        user.bearerToken = res.data.message.bearerToken;
        expect(res.data.status).to.equal(200);
    }));

    it('shouldn´t update the Mail Sender integration info from app - Wrong API Key', mochaAsync(async () => {
        let postData = {
            app : app.id,
            "apiKey" : "retertert",
            "templateIds" : [
                { "template_id": 1, "futionName": "USER_LOGIN", "connctionName": "USER_REGISTER", "contactlist_Id"  : 2 },
                { "template_id": 2, "functactlist_Id"  : 2 },
                { "template_id": 1, "functionName": "USER_RESET_PASSWORD", "contactlist_Id"  : 2 }
            ]
        }
        let res = await editAppMailSenderIntegration({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});
        expect(res.data.status).to.equal(404);
    }));

    it('should update the Mail Sender integration info from app', mochaAsync(async () => {
        let postData = {
            app : app.id,
            "apiKey" : "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",
            "templateIds" : [
                { "template_id": 1, "functionName": "USER_REGISTER", "contactlist_Id"  : 2 },
                { "template_id": 2, "functionName": "USER_LOGIN", "contactlist_Id"  : 2 },
                { "template_id": 1, "functionName": "USER_RESET_PASSWORD", "contactlist_Id"  : 2 }
            ]
        }
        let res = await editAppMailSenderIntegration({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});
        expect(res.data.status).to.equal(200);
    }));

    it('should login the User with SendInBlue API Key not null', mochaAsync(async () => {
        var res = await loginUser(userPostData);
        user.bearerToken = res.data.message.bearerToken;
        expect(res.data.status).to.equal(200);
    }));



    it('should register the Admin with Platform SendInBlue API Key', mochaAsync(async () => {
        var res = await registerAdmin(BOILERPLATES.admins.NORMAL_REGISTER_4);
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));
});
