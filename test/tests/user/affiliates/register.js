import { detectValidationErrors, mochaAsync } from '../../../utils';

import chai from 'chai';
import { addCustomAffiliateStructureToUser, createUser, editAppStructure, getApp } from '../../../services';

const expect = chai.expect;
const ticker = 'ETH';


const inputs = {
    structures : [{level : 1, percentageOnLoss : 0.04}, {level : 2, percentageOnLoss : 0.03}, {level : 3, percentageOnLoss : 0.02}]
}

context('Register', async () => {
    var app, admin, res_1, res_2, res_3, res_4, res_5;


    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
        await editAppStructure({app, admin, structures : inputs.structures});
    });


    it('it should register with affiliates with no parent User', mochaAsync(async () => {
        res_1 = await createUser({app_id : app.id});
        global.test.user_1 = res_1;
        detectValidationErrors(res_1);
        const { status, message } = res_1;
        expect(status).to.equal(200);
        expect(message.affiliateId).to.not.be.null;
        expect(message.affiliateInfo.userAffiliated).to.equal(message._id);
        expect(message.affiliateInfo.userAffiliate).to.equal(undefined);
        const affiliateWalletCurrency = message.affiliateInfo.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(ticker).toLowerCase());

        expect(message.affiliateInfo.wallet.length).to.equal(2);
        expect(affiliateWalletCurrency.playBalance).to.equal(0);
        expect(message.affiliateInfo.parentAffiliatedLinks).to.equal(undefined);
        
        expect(message.affilateLinkInfo.affiliateStructure.level).to.equal(inputs.structures[0].level);
        expect(message.affilateLinkInfo.affiliateStructure.percentageOnLoss).to.equal(inputs.structures[0].percentageOnLoss);
        
    }));

    it('it should register with affiliates for link for parent user only', mochaAsync(async () => {
        const { affiliateId, id } = res_1.message;
        res_2 = await createUser({app_id : app.id, affiliateLink : affiliateId});
        global.test.user_2 = res_2;
        detectValidationErrors(res_2);
        const { status, message } = res_2;
        expect(status).to.equal(200);
        expect(message.affiliateId).to.not.be.null;

        const affiliateWalletCurrency = message.affiliateInfo.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(ticker).toLowerCase());
        //expect(message.affilateLinkInfo.userAffiliate).to.equal(id);
        expect(message.affilateLinkInfo.parentAffiliatedLinks.length).to.equal(1);

        expect(message.affilateLinkInfo.affiliateStructure.level).to.equal(inputs.structures[0].level);
        expect(message.affilateLinkInfo.affiliateStructure.percentageOnLoss).to.equal(inputs.structures[0].percentageOnLoss);

        expect(message.affilateLinkInfo.parentAffiliatedLinks[0].affiliateStructure.level).to.equal(inputs.structures[0].level);
        expect(message.affilateLinkInfo.parentAffiliatedLinks[0].affiliateStructure.percentageOnLoss).to.equal(inputs.structures[0].percentageOnLoss);


    }));

    it('it should register with affiliates for link for parent and its parent levels', mochaAsync(async () => {

        const { affiliateId, id } = res_2.message;
        res_3 = await createUser({app_id : app.id, affiliateLink : affiliateId});
        global.test.user_3 = res_3;
        detectValidationErrors(res_3);
        const { status, message } = res_3;
        expect(status).to.equal(200);
        expect(message.affiliateId).to.not.be.null;

        const affiliateWalletCurrency = message.affiliateInfo.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(ticker).toLowerCase());
        //expect(message.affilateLinkInfo.userAffiliate).to.equal(id);
        expect(affiliateWalletCurrency.playBalance).to.equal(0);
        expect(message.affilateLinkInfo.parentAffiliatedLinks.length).to.equal(2);

        expect(message.affilateLinkInfo.affiliateStructure.level).to.equal(inputs.structures[0].level);
        expect(message.affilateLinkInfo.affiliateStructure.percentageOnLoss).to.equal(inputs.structures[0].percentageOnLoss);
        expect(message.affilateLinkInfo.parentAffiliatedLinks[0].affiliateStructure.level).to.equal(inputs.structures[1].level);
        expect(message.affilateLinkInfo.parentAffiliatedLinks[0].affiliateStructure.percentageOnLoss).to.equal(inputs.structures[1].percentageOnLoss);

        expect(message.affilateLinkInfo.parentAffiliatedLinks[1].affiliateStructure.level).to.equal(inputs.structures[0].level);
        expect(message.affilateLinkInfo.parentAffiliatedLinks[1].affiliateStructure.percentageOnLoss).to.equal(inputs.structures[0].percentageOnLoss);
    }));

    it('it should allow create user 4', mochaAsync(async () => {

        res_4 = await createUser({app_id : app.id});
        global.test.user_4 = res_4;
        detectValidationErrors(res_4);
        const { status, message } = res_4;
        expect(status).to.equal(200);
        expect(message.affiliateId).to.not.be.null;
        
        const affiliateWalletCurrency = message.affiliateInfo.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(ticker).toLowerCase());
        //expect(message.affilateLinkInfo.userAffiliate).to.equal(id);
        expect(affiliateWalletCurrency.playBalance).to.equal(0);
        expect(message.affilateLinkInfo.parentAffiliatedLinks.length).to.equal(0);
    }));


    it('it should allow app to give custom affiliate percentage (%) to desired user', mochaAsync(async () => {
        const postData = {
            user : res_4.message.id,
            affiliatePercentage : 0.3,
            app : app
        };

        let res = await addCustomAffiliateStructureToUser({...postData, admin: admin});
        detectValidationErrors(res);
        const { status } = res.data;
        expect(status).to.equal(200);

        let app_data_after = await getApp({app, admin});
        const { message : data_after } = app_data_after.data;

        /* Test if they are 1 */
        expect(data_after.affiliateSetup.customAffiliateStructures.length).to.equal(1);
    }));

    it('it should allow create user 5', mochaAsync(async () => {
    
        const { affiliateId, id } = res_4.message;
        res_5 = await createUser({app_id : app.id, affiliateLink : affiliateId});
        global.test.user_5 = res_5;
        detectValidationErrors(res_5);
        const { status, message } = res_5;

        let app_data = await getApp({app, admin});
        const { message : app_data_after } = app_data.data;

        expect(status).to.equal(200);
        expect(message.affiliateId).to.not.be.null;

        
        const affiliateWalletCurrency = message.affiliateInfo.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(ticker).toLowerCase());
        //expect(message.affilateLinkInfo.userAffiliate).to.equal(id);
        expect(affiliateWalletCurrency.playBalance).to.equal(0);
        expect(message.affilateLinkInfo.parentAffiliatedLinks.length).to.equal(1);

        expect(message.affilateLinkInfo.affiliateStructure.level).to.equal(inputs.structures[0].level);
        expect(message.affilateLinkInfo.affiliateStructure.percentageOnLoss).to.equal(inputs.structures[0].percentageOnLoss);
        expect(message.affilateLinkInfo.parentAffiliatedLinks.length).to.equal(1);
        expect(message.affilateLinkInfo.parentAffiliatedLinks[0].affiliateStructure.level).to.equal(app_data_after.affiliateSetup.customAffiliateStructures[0].level);
        expect(message.affilateLinkInfo.parentAffiliatedLinks[0].affiliateStructure.percentageOnLoss).to.equal(app_data_after.affiliateSetup.customAffiliateStructures[0].percentageOnLoss);

    }));
});

