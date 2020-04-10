import {
    getAppAuth,
    getGames
} from '../../../methods';

import chai from 'chai';
import models from '../../../models';

import {
    shouldGetAllAppGamesUserIntegration,
    shouldGetAppDataAuth
} from '../../output/AppTestMethod';
import { mochaAsync, detectValidationErrors } from '../../../utils';

const expect = chai.expect;


context('App Data Auth', async () =>  {
    var admin, app;


    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });


    it('should Get App Data Auth', mochaAsync(async () => {
        let get_app_model = models.apps.get_app(app.id);
        let res = await getAppAuth({...get_app_model, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        detectValidationErrors(res);
        /* Set app Global Variable for Further Test */
        global.test.app = res.data.message;
        shouldGetAppDataAuth(res.data, expect);
    })); 

    it('should get All App Games', mochaAsync(async () => {
        let get_app_model = models.apps.get_app(app.id);
        let res = await getGames({...get_app_model, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        detectValidationErrors(res);
        shouldGetAllAppGamesUserIntegration(res.data, expect);
    })); 


});
