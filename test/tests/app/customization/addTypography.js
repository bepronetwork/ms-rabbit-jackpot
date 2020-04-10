import chai from 'chai';
import { mochaAsync, detectValidationErrors } from '../../../utils';
import { editTypographyApp } from '../../../methods';
const expect = chai.expect;

context('Edit Typography', async () => {
    var app, admin;

    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });


    it('should be able to edit app typography', mochaAsync(async () => {

        const postData = {
            typography : {
                name : "Open Sans Regular",
                url  : "https://fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2"
            },
            app : app.id
        };

        let res = await editTypographyApp({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});

        expect(detectValidationErrors(res)).to.be.equal(false);

        const { status } = res.data;
        expect(status).to.be.equal(200);
    }));
});
