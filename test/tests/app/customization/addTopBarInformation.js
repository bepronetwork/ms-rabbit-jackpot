import chai from 'chai';
import { mochaAsync, detectValidationErrors } from '../../../utils';
import { editTopBarCustomizationApp, getAppAuth } from '../../../methods';
import { get_app } from '../../../models/apps';
const expect = chai.expect;

context('Add TopBar Info', async () => {
    var app, admin;

    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });


    it('should be able to edit top bar info', mochaAsync(async () => {

        const postData = {
            backgroundColor : '#ccc',
            textColor : '#ccc',
            app : app.id,
            text : 'yep!',
            isActive : true
        };

        let res = await editTopBarCustomizationApp({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});

        expect(detectValidationErrors(res)).to.be.equal(false);

        let res_app = await getAppAuth({...get_app(app.id), admin: admin.id}, admin.security.bearerToken, {id : admin.id});

        const { status } = res.data;
        expect(status).to.be.equal(200);

        const { topBar } = res_app.data.message.customization;

        expect(postData.backgroundColor).to.be.equal(topBar.backgroundColor);
        expect(postData.textColor).to.be.equal(topBar.textColor);
        expect(postData.text).to.be.equal(topBar.text);
        expect(postData.isActive).to.be.equal(topBar.isActive);
    }));
});
