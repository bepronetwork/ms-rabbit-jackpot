import chai from 'chai';
import { mochaAsync, detectValidationErrors } from '../../../utils';
import { getAppAuth, addCurrencyWalletToApp, getEcosystemData } from '../../../methods';
import { get_app } from '../../../models/apps';
const expect = chai.expect;

context('Add Currency Wallet', async () => {
    var app, admin, TokenTicker = 'eth';

    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });

    it('should be able to add currency bank ETH to app', mochaAsync(async () => {

        /* Get Available Currencies */
        const eco_data = (await getEcosystemData()).data.message;
        const eco_currencies = eco_data.currencies;
        const currency = eco_currencies.find( c => new String(c.ticker).toLowerCase() == 'eth')

        const postData = {
            app : app.id,
            passphrase : 'test',
            currency_id : currency._id
        };

        /* Guarantee Currency Added with Success to Wallet */

        let res = await addCurrencyWalletToApp({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});
        expect(detectValidationErrors(res)).to.be.equal(false);
        const { status } = res.data;
        expect(status).to.be.equal(200);
        
        /* Verify if new wallet has that info */
        let res_app = await getAppAuth({...get_app(app.id), admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        global.test.app = res_app.data.message;

        const { wallet } = res_app.data.message;
        expect(wallet.length).to.be.equal(1);
        const walletCurrencyApp = wallet.find( c => new String(c.currency.ticker).toLowerCase() == 'eth');
        expect(walletCurrencyApp).to.not.be.null;
        expect(walletCurrencyApp.currency._id).to.be.equal(postData.currency_id);
        expect(walletCurrencyApp.bank_address).to.not.be.null;
        expect(walletCurrencyApp.playBalance).to.be.equal(0);

    }));


    it('should be able to add currency bank BTC to app', mochaAsync(async () => {

        /* Get Available Currencies */
        const eco_data = (await getEcosystemData()).data.message;
        const eco_currencies = eco_data.currencies;
        const currency = eco_currencies.find( c => new String(c.ticker).toLowerCase() == 'btc')

        const postData = {
            app : app.id,
            passphrase : 'test',
            currency_id : currency._id
        };

        /* Guarantee Currency Added with Success to Wallet */

        let res = await addCurrencyWalletToApp({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});
        expect(detectValidationErrors(res)).to.be.equal(false);
        const { status } = res.data;
        expect(status).to.be.equal(200);
        
        /* Verify if new wallet has that info */
        let res_app = await getAppAuth({...get_app(app.id), admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        global.test.app = res_app.data.message;

        const { wallet } = res_app.data.message;
        expect(wallet.length).to.be.equal(2);
        const walletCurrencyApp = wallet.find( c => new String(c.currency.ticker).toLowerCase() == 'btc');
        expect(walletCurrencyApp).to.not.be.null;
        expect(walletCurrencyApp.currency._id).to.be.equal(postData.currency_id);
        expect(walletCurrencyApp.bank_address).to.not.be.null;
        expect(walletCurrencyApp.playBalance).to.be.equal(0);

    }));

    it('should´t be able to add wallet balance without valid currency id', mochaAsync(async () => {

        const postData = {
            app : app.id,
            passphrase : 'test',
            currency_id : "45763"
        };

        /* Guarantee Currency Added with Success to Wallet */

        let res = await addCurrencyWalletToApp({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});
        expect(detectValidationErrors(res)).to.be.equal(false);
        const { status } = res.data;
        expect(status).to.be.equal(404);
    }));


    it(`shouldn´t be able to replace app eth wallet (${TokenTicker})`, mochaAsync(async () => {
        /* Get Available Currencies */
        const eco_data = (await getEcosystemData()).data.message;
        const eco_currencies = eco_data.currencies;
        const currency = eco_currencies.find( c => new String(c.ticker).toLowerCase() == TokenTicker.toLowerCase())

        const postData = {
            app : app.id,
            passphrase : 'test',
            currency_id : currency._id
        };

        /* Guarantee Currency Added with Success to Wallet */

        let res = await addCurrencyWalletToApp({...postData, admin: admin.id}, admin.security.bearerToken , {id : admin.id});
        expect(detectValidationErrors(res)).to.be.equal(false);
        const { status } = res.data;
        expect(status).to.be.equal(46);
    }));

});
