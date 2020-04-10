import chai from 'chai';
import { mochaAsync, detectValidationErrors } from '../../../utils';
import { editFooterCustomizationApp, getAppAuth } from '../../../methods';
const expect = chai.expect;

context('Edit Footer', async () => {
    var app, admin;

    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });


    it('should be able to edit app footer Links', mochaAsync(async () => {

        const postData = {
            supportLinks : [
                {
                    "name" :    "Affiliate",
                    "href"  :    "https://"
                },
                {
                    "name" :    "Affiliate 2",
                    "href"  :    "https://"
                },
            ],
            communityLinks : [
                {
                    "name" :    "Affiliate",
                    "href"  :    "https://"
                },
                {
                    "name" :    "Affiliate 2",
                    "href"  :    "https://"
                },
            ],
            app : app.id
        };

        let res = await editFooterCustomizationApp({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});

        expect(detectValidationErrors(res)).to.be.equal(false);

        const { status } = res.data;
        expect(status).to.be.equal(200);
    }));
});
