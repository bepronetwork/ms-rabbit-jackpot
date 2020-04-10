import chai from 'chai';
import { mochaAsync, detectValidationErrors } from '../../../utils';
import { getAppAuth, addCurrencyWalletToApp, getEcosystemData,  getAppUsers} from '../../../methods';
import { get_app } from '../../../models/apps';
const expect = chai.expect;

context('Add Currency Wallet', async () => {
    var app, admin, ercTokenTicker = '';

    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });


    it(`should be able to add currency bank ERC-20 to app (${ercTokenTicker})`, mochaAsync(async () => {

        /* Get Available Currencies */
        const eco_data = (await getEcosystemData()).data.message;
        const eco_currencies = eco_data.currencies;
        const currency = eco_currencies.find( c => new String(c.ticker).toLowerCase() == ercTokenTicker.toLowerCase())

        const postData = {
            app : app.id,
            passphrase : 'test',
            currency_id : currency._id
        };

        /* Guarantee Currency Added with Success to Wallet */

        let res = await addCurrencyWalletToApp({...postData, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        expect(detectValidationErrors(res)).to.be.equal(false);
        const { status } = res.data;
        expect(status).to.be.equal(200);
        
        /* Verify if new wallet has that info */
        let res_app = await getAppAuth({...get_app(app.id), admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        const { wallet } = res_app.data.message;
        expect(wallet.length).to.be.equal(3);

        const walletCurrencyApp = wallet.find( c => new String(c.currency.ticker).toLowerCase() == ercTokenTicker.toLowerCase());

        expect(walletCurrencyApp).to.not.be.null;
        expect(walletCurrencyApp.currency._id).to.be.equal(postData.currency_id);
        expect(walletCurrencyApp.bank_address).to.be.equal(postData.bank_address);
        expect(walletCurrencyApp.playBalance).to.be.equal(0);
  
    
        /* Check if affilçiate wallets of the users have the currency wallet */
        res = await getAppUsers({app : app.id, admin: admin.id}, admin.security.bearerToken, {id : admin.id});
        const users = res.data.message;

        users.map( u => {
            /* Check if wallet has all  */
            expect(u.wallet.length).to.be.equal(3);
            expect(u.affiliate.wallet.length).to.be.equal(3);
        
            const userCurrencyWallet = u.wallet.find( c => new String(c.currency).toLowerCase() == currency._id.toLowerCase());
            /* New Wallet exists */
            expect(userCurrencyWallet).to.not.be.null;
            expect(userCurrencyWallet.currency).to.be.equal(postData.currency_id);
            expect(userCurrencyWallet.playBalance).to.be.equal(0);

            const userCurrencyWalletAffiliate = u.affiliate.wallet.find( c => new String(c.currency).toLowerCase() == currency._id.toLowerCase());
            /* New Wallet exists */
            expect(userCurrencyWalletAffiliate).to.not.be.null;
            expect(userCurrencyWalletAffiliate.currency).to.be.equal(postData.currency_id);
            expect(userCurrencyWalletAffiliate.playBalance).to.be.equal(0);
        })
    }));

});
