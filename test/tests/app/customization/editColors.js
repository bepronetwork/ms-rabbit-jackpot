import chai from 'chai';
import { mochaAsync, detectValidationErrors } from '../../../utils';
import { editColorsCustomizationApp } from '../../../methods';
const expect = chai.expect;

context('Edit Colors', async () => {
    var app, admin;

    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });


    it('should be able to edit app colors', mochaAsync(async () => {

        const postData = {
            colors : [
                {
                    "type" :    "backgroundColor",
                    "hex"  :    "#ffffff"
                },
                {
                    "type" :    "primaryColor",
                    "hex"  :    "#cccccc"
                },
                {
                    "type" :    "secondaryColor",
                    "hex"  :    "#eeeeeee"
                },
                {
                    "type" :    "thirdColor",
                    "hex"  :    "#ffffff"
                },
                {
                    "type" :    "forthColor",
                    "hex"  :    "#ffffff"
                },
                {
                    "type" :    "fifthColor",
                    "hex"  :    "#ffffff"
                },
                {
                    "type" :    "sixthColor",
                    "hex"  :    "#ffffff"
                },
                {
                    "type" :    "seventhColor",
                    "hex"  :    "#ffffff"
                },
                {
                    "type" :    "heightColor",
                    "hex"  :    "#ffffff"
                }
            ],
            app : app.id
        };

        let res = await editColorsCustomizationApp({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});

        expect(detectValidationErrors(res)).to.be.equal(false);

        const { status } = res.data;
        expect(status).to.be.equal(200);
    }));
});
