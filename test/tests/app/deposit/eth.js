import chai from 'chai';
import { mochaAsync, detectValidationErrors } from '../../../utils';
import { getAppAuth, webhookConfirmDepositFromBitgo } from '../../../methods';
import { get_app } from '../../../models/apps';
import { globalsTest } from '../../../GlobalsTest';
import { shouldntUpdateWalletWithAlreadyPresentTransaction } from '../../output/AppTestMethod';
import { bitgoDepositExample } from './examples/bitgoDepositExample';
import { DepositRepository } from '../../../../src/db/repos';
import { provideFunds } from '../../../utils/env';
import delay from 'delay';

const expect = chai.expect;
const ticker = 'ETH';

context(`${ticker}`, async () => {
    var app, admin, currencyWallet, depositAmount, tx;

    before( async () =>  {
        admin = global.test.admin;
        app = (await getAppAuth({...get_app(global.test.app.id), admin: admin.id}, global.test.admin.security.bearerToken, {id : global.test.admin.id})).data.message;
        currencyWallet = app.wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(ticker).toLowerCase());
        depositAmount = 0.2;
    });

    it('should update wallet with deposit (webhook)', mochaAsync(async () => {
        let body = bitgoDepositExample();
        // Remove Test Wallet Transaction Example
        await DepositRepository.prototype.deleteDepositByTransactionHash(body.hash)

        // User master address of app to work as the Bank Address
        let bankContract = globalsTest.getCasinoETHContract(currencyWallet.bank_address, global.ownerAccount);
        /* Create Deposit App Transaction - Tokens Sent with not wrong token amount */ 
        tx = await new Promise( async  (resolve, reject) => {
            try{
                await bankContract.sendFundsToCasinoContract(depositAmount, {gasPrice : 1, gas : 23592}, async (tx) => {
                    resolve(tx);
                });
            }catch(err){reject(err)}
        });
        /* Wait for wallet to be created */

        await delay(100* 1000);
        let res = await webhookConfirmDepositFromBitgo(body, app.id, currencyWallet.currency._id);
        /** provide funds for furthger testing */
        await provideFunds({wallet : currencyWallet._id, amount : 1});
        const { status } = res.data;
        detectValidationErrors(res);
        expect(status).to.equal(200);
    }));

    it('shouldnt update Wallet with already checked tx', mochaAsync(async () => {
        let body = bitgoDepositExample();

        let res = await webhookConfirmDepositFromBitgo(body, app.id, currencyWallet.currency._id);
        detectValidationErrors(res);
        shouldntUpdateWalletWithAlreadyPresentTransaction(res.data, expect);
    }));
});
