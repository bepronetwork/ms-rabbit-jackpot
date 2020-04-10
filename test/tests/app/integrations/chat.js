import chai from 'chai';

import {

} from '../../output/AppTestMethod';
import { mochaAsync } from '../../../utils';

const expect = chai.expect;

context('Chat', async () =>  {
    var admin, app;


    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });

    it('should update the integration info from app', mochaAsync(async () => {
        let postData = {
            app : app.id,
            isActive : true,
            integration_id : app.integrations.chat._id,
            publicKey : 'w934m8phxhjk',
            privateKey : 'cghpdjgz89t9c8pp79bcmx2ed3j97sqvccge8m3p9ze7kmsck7t5a7ws4wd94675',
            integration_type : 'live_chat'
        }
        let res = await editAppIntegration(postData, BEARER_TOKEN, {id : APP_ID});
        shouldUpdateTheIntegrationInfoFromApp(res.data, expect);
    })); 
});
