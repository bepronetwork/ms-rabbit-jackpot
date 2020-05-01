const BitGo = require('bitgo');
import { BITGO_ACCESS_TOKEN, IS_DEVELOPMENT, BITGO_ENTERPRISE_ID, MS_MASTER_URL, QUOTA_GUARD_URL } from '../../../config';
import { normalizePolicy, getCurrencyAmountFromBitGo } from './helpers';

class BitGoClass {
    constructor(){
        this.bitgo = new BitGo.BitGo({ accessToken: BITGO_ACCESS_TOKEN, proxy : QUOTA_GUARD_URL, env : IS_DEVELOPMENT ? 'test' : 'prod' });
    }

    async __init__(){
        this.session = await this.bitgo.session();
    }

    async createWallet({label, passphrase, currency}){
        const currencyTicker = `${IS_DEVELOPMENT ? 't' : ''}${new String(currency).toLowerCase()}`;
        /* All test wallets start with t${currency_name} --- t behind the currency ex : tbtc */
        var { wallet, userKeychain, backupKeychain, bitgoKeychain } = await this.bitgo.coin(currencyTicker).wallets().generateWallet({label, passphrase, enterprise : BITGO_ENTERPRISE_ID});
        console.log("currencyTicker 2", currencyTicker)

        // Wait for wallet tx init - force delay
        wallet = await this.getWallet({ticker : currency, id : wallet.id()});

        let receiveAddress = (wallet._wallet.receiveAddress && wallet._wallet.receiveAddress.address) ? wallet._wallet.receiveAddress.address : wallet._wallet.coinSpecific.baseAddress;

        return { 
            wallet, 
            receiveAddress,
            keys : { 
                user : userKeychain, 
                backup : backupKeychain, 
                bitgo : bitgoKeychain
            } 
        };
    }

    async addPolicyToWallet({bitGoWalletId, amount, timeWindow, ticker}){
        var wallet = await this.getWallet({ticker, id : bitGoWalletId});
        let policy = normalizePolicy({timeWindow, ticker});
        return await wallet.createPolicyRule(policy);
    }

    async getWallet({ticker, id}){
        const currencyTicker = `${IS_DEVELOPMENT ? 't' : ''}${new String(ticker).toLowerCase()}`;
        return await this.bitgo.coin(currencyTicker).wallets().get({id});
    }

    async generateDepositAddress({wallet, id, label}){
        label = new String(label).toLowerCase().toString();
        //Check if Deposit Address Exists
        if(!id){
            return await wallet.createAddress({label});
        }else{
            return await wallet.getAddress({id});
        }
    }

    async getTransaction({id, wallet_id, ticker}){
        const wallet = await this.getWallet({ticker, id : wallet_id});
        var res = await wallet.getTransfer({ id });
        // Update Amount based on the type of Wei or Sats
        res.value = getCurrencyAmountFromBitGo({ticker, amount : res.value});
        return res;
    }

    async addAppDepositWebhook({wallet, id, currency_id}){
        let res = await wallet.addWebhook({
            url: `${MS_MASTER_URL}/api/app/webhookBitgoDeposit?id=${id}&currency=${currency_id}`,
            type: "transfer",
            numConfirmations : 3,
            listenToFailureStates : false
        });
        return res;
    }
}


var BitGoSingleton = new BitGoClass();

export default BitGoSingleton;
