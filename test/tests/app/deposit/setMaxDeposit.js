import chai from 'chai';
import { mochaAsync } from '../../../utils';
import { getAppAuth, setAppMaxDeposit } from '../../../methods';
import { get_app } from '../../../models/apps';

const expect = chai.expect;
var currencyWallet;

function updateCurrencyWallet(localTicker,app) {
    currencyWallet = app.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(localTicker).toLowerCase());
}

context(`Set Max Deposit`, async () => {
    var app, admin;

    before( async () =>  {
        admin = global.test.admin;
        app = (await getAppAuth({...get_app(global.test.app.id), admin: admin.id}, global.test.admin.security.bearerToken, {id : global.test.admin.id})).data.message;
        updateCurrencyWallet('ETH',app);
    });

    it('should set max for ETH success', mochaAsync(async () => {
        let dataMaxDeposit = await setAppMaxDeposit({
            app: app.id,
            wallet_id: currencyWallet._id,
            amount: 0.4,
            admin: admin.id
        }, admin.security.bearerToken, {id : admin.id});
        expect(dataMaxDeposit.data.status).to.be.equal(200);
        expect(dataMaxDeposit.data.status).to.not.be.null;
    }));
    it('should set max for ETH not auth', mochaAsync(async () => {
        let dataMaxDeposit = await setAppMaxDeposit({
            app: app.id,
            wallet_id: currencyWallet._id,
            amount: 0.4,
        }, null, {id : app.id});
        expect(dataMaxDeposit.data.status).to.be.equal(304);
        expect(dataMaxDeposit.data.status).to.not.be.null;
    }));
});
