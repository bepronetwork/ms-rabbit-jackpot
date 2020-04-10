import {
    registerApp,
    getApp,
    addAppServices,
    authAdmin,
    getAppAuth,
    addAdmin,
    registerAdmin,
    getAdminByApp,
    editAdminType
} from '../../../methods';

import faker from 'faker';
import chai from 'chai';
import models from '../../../models';

import {
    shouldCreateTheApp,
    shouldGetNewBearerToken,
    shouldGetAppDataAuth,
    shouldGetAppData,
    shouldIntegrateServicesIntoApp
} from '../../output/AppTestMethod';

import { mochaAsync, genData, detectValidationErrors } from '../../../utils';
import MiddlewareSingleton from '../../../../src/api/helpers/middleware';
import { SendinBlueSingleton } from '../../../../src/logic/third-parties/sendInBlue';

const expect = chai.expect;

context('Normal', async () =>  {
    var admin, app, dataAdminAdd, adminToModify;

    before(async () => {
        admin = global.test.admin;
        dataAdminAdd = {email: null, bearerToken: null};
    });

    it('should regist the App with admin id provided', mochaAsync( async () => {
        let app_call_model = genData(models.apps.app_normal_register(admin.id));
        var res = await registerApp(app_call_model);
        detectValidationErrors(res);
        shouldCreateTheApp(res.data, expect);
        expect(res.data.message.virtual).to.equal(false);
    }));

    it('Should update a contact', mochaAsync(async () => {
        try {
            const email = admin.email;
            const attributes = {
                NAME: faker.name.firstName()
            };
            await SendinBlueSingleton.updateContact(email, attributes);
        } catch (err) {
            console.log(err)
        }
    }));

    it('Shouldnt update a contact that not exists', mochaAsync(async () => {
        try {
            const email = faker.internet.email();
            const attributes = {
                NAME: faker.name.firstName()
            };
            await SendinBlueSingleton.updateContact(email, attributes);
        } catch (err) {
            expect(err.status).to.equal(404);
        }
    }));

    it('should auth admin', mochaAsync(async () => {
        let res = await authAdmin({
            admin: admin.id
        }, admin.security.bearerToken, { id: admin.id });
        app = res.data.message.app;
        detectValidationErrors(res);
        shouldGetNewBearerToken(res.data, expect);
    }));

    it('should Get Admin by App', mochaAsync(async () => {
        let res = await getAdminByApp({
            admin: admin.id,
            app: app.id
        }, admin.security.bearerToken, { id: admin.id });
        expect(res.data.status).to.not.be.null;
        expect(res.data.status).to.equal(200);
    }));


    it('should Get App Data Auth', mochaAsync(async () => {
        let get_app_model = models.apps.get_app(app.id);

        let res = await getAppAuth({...get_app_model, admin: admin.id}, admin.security.bearerToken, { id: admin.id });
        /* Set app Global Variable for Further Test */
        global.test.app = res.data.message;
        detectValidationErrors(res);
        shouldGetAppDataAuth(res.data, expect);
    }));

    it('should add Admin', mochaAsync(async () => {
        dataAdminAdd.email = `p${(new Date()).getTime()}@gmail.com`;
        let res = await addAdmin({
            email			: dataAdminAdd.email,
            app             : app.id,
            admin           : admin.id
        }, admin.security.bearerToken, { id : admin.id});
        dataAdminAdd.bearerToken = res.data.message.security.bearerToken;
        expect(res.data.status).to.not.be.null;
        expect(res.data.status).to.equal(200);
    }));

    it('should add Admin again', mochaAsync(async () => {
        let res = await addAdmin({
            email			: dataAdminAdd.email,
            app             : app.id,
            admin           : admin.id
        }, admin.security.bearerToken, { id : admin.id});
        dataAdminAdd.bearerToken = res.data.message.security.bearerToken;
        adminToModify = res.data.message._id;
        expect(res.data.status).to.not.be.null;
        expect(res.data.status).to.equal(200);
    }));

    it('should Confirm Admin with token invalid', mochaAsync(async () => {
        var res = await registerAdmin({
            email       : dataAdminAdd.email,
            bearerToken : MiddlewareSingleton.generateTokenDate( ( new Date( ((new Date()).getTime() + 7 * 24 * 60 * 60 * 1000) )).getTime() ),
            name        : 'Paul',
            username    : `user${(new Date()).getTime()}`,
            password    : `password${(new Date()).getTime()}`
        });
        expect(res.data.status).to.not.be.null;
        expect(res.data.status).to.equal(49);
    }));

    it('should Confirm Admin with token expired', mochaAsync(async () => {
        var res = await registerAdmin({
            email       : dataAdminAdd.email,
            bearerToken : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNTgwOTUyMjgwODg3LCJpYXQiOjE1ODA5NTEwMzd9.qovq5qXqzWdlSSvkx5XSTpYU5BSfaAMWvQWf1pLadcfPySw2Q0lk5WAuHoIVQlCYvXioKM86gnIpQQLKw_zAiA',
            name        : 'Paul',
            username    : `user${(new Date()).getTime()}`,
            password    : `password${(new Date()).getTime()}`
        });
        expect(res.data.status).to.not.be.null;
        expect(res.data.status).to.equal(48);
    }));

    it('should Confirm Admin with token', mochaAsync(async () => {
        var res = await registerAdmin({
            email       : dataAdminAdd.email,
            bearerToken : dataAdminAdd.bearerToken,
            name        : 'Paul',
            username    : `user${(new Date()).getTime()}`,
            password    : `password${(new Date()).getTime()}`
        });
        expect(res.data.status).to.not.be.null;
        expect(res.data.status).to.equal(200);
    }));
    
    it('should Edit Type of Admin', mochaAsync(async () => {
        let res = await editAdminType({
            admin			: admin.id,
            adminToModify,
            permission      : {
                super_admin    : false,
                customization  : false,
                withdraw       : false,
                user_withdraw  : false,
                financials     : false,
            }
        }, admin.security.bearerToken, { id : admin.id});
        expect(res.data.status).to.not.be.null;
        expect(res.data.status).to.equal(200);
    }));

    it('should Get App Data', mochaAsync(async () => {
        let get_app_model = models.apps.get_app(app.id);
        let res = await getApp(get_app_model);
        detectValidationErrors(res);
        shouldGetAppData(res.data, expect);
    }));

    it('should Integrate Services into App', mochaAsync(async () => {
        let service_call_add_model = models.apps.add_services(app.id, [101, 201]);
        let res = await addAppServices({...service_call_add_model, admin: admin.id}, admin.security.bearerToken, { id: admin.id });
        detectValidationErrors(res);
        shouldIntegrateServicesIntoApp(res.data, expect);
    }));

});
