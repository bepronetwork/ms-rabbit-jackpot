import {
    registerApp,
    getApp,
    registerAdmin,
    addAppServices,
    loginAdmin
} from '../../../methods';

import chai from 'chai';
import models from '../../../models';

import {
    shouldCreateTheApp,
    shouldIntegrateServicesIntoApp
} from '../../output/AppTestMethod';

import {
    shouldRegisterTheAdmin,
    shouldLoginTheAdmin
} from '../../output/AdminTestMethod'

import { mochaAsync, genData, detectValidationErrors } from '../../../utils';

const expect = chai.expect;

context('Virtual', async () =>  {
    var admin, app, dataAdminAdd, adminToModify;

    before(async () => {
        dataAdminAdd = {email: null, bearerToken: null};
    });

    it('should register the Admin', mochaAsync(async () => {
        let res = await registerAdmin(BOILERPLATES.admins.NORMAL_REGISTER_5);
        detectValidationErrors(res);
        shouldRegisterTheAdmin(res.data, expect);
    }));

    it('should login the Admin with username', mochaAsync(async () => {
        admin = BOILERPLATES.admins.NORMAL_REGISTER_5;
        let res = await loginAdmin({username : admin.username, password : admin.password});
        detectValidationErrors(res);
        shouldLoginTheAdmin(res.data, expect);
        admin = res.data.message;
    }));

    it('should register the App with admin id provided', mochaAsync( async () => {
        let app_call_model = genData(models.apps.app_normal_register(admin.id));
        var res = await registerApp({...app_call_model, virtual : true});
        detectValidationErrors(res);
        shouldCreateTheApp(res.data, expect);
        expect(res.data.message.virtual).to.equal(true);
        app = res.data.message;
    }));

    it('should Integrate Services into App', mochaAsync(async () => {
        let service_call_add_model = models.apps.add_services(app.id, [101, 201]);
        let res = await addAppServices({...service_call_add_model, admin: admin.id}, admin.bearerToken, { id: admin.id });
        detectValidationErrors(res);
        shouldIntegrateServicesIntoApp(res.data, expect);
    }));

});
