import request from 'supertest';
import _ from 'lodash';
import account from './logic/eth/models/account';
import CasinoContract from './logic/eth/CasinoContract';
import { globalsTest } from './GlobalsTest';
import Numbers from './logic/services/numbers';

module.exports = {
    async registerUser(params) {
        return request(global.server)
        .post('/api/users/register')
        .send(params)
        .then(res => detectServerError(res))
    },
    async resendEmail(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/users/email/resend')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .set("payload", getPayloadString(payload))
        .then(res => detectServerError(res))
    },
    async confirmEmail(params) {
        return request(global.server)
        .post('/api/users/email/confirm')
        .send(params)
        .then(res => detectServerError(res))
    },
    async registerAdmin(params) {
        return request(global.server)
        .post('/api/admins/register')
        .send(params)
        .then(res => detectServerError(res))
    },
    async addAdmin(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/admins/add')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .set("payload", getPayloadString(payload))
        .then(res => detectServerError(res))
    },
    async addJackpot(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/jackpot/add')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async addAutoWithdraw(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/autoWithdraw/add')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editAutoWithdraw(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/autoWithdraw/editAutoWithdraw')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editEdgeJackpot(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/jackpot/edge/edit')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editAdminType(params, bearerToken, payload){
        return request(global.server)
        .post('/api/admins/editType')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async loginAdmin(params) {
        return request(global.server)
        .post('/api/admins/login')
        .send(params)
        .then(res => detectServerError(res))
    },
    async pingPusher(params) {
        return request(global.server)
        .post('/api/users/pusher/ping')
        .send(params)
        .then(res => detectServerError(res))
    },
    async loginUser(params) {
        return request(global.server)
        .post('/api/users/login')
        .send(params)
        .then(res => detectServerError(res))
    },
    async getPushNotificationsChannel(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/users/push/auth')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .set("payload", getPayloadString(payload))
        .then(res => detectServerError(res))
    },
    async authAdmin(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/admins/auth')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .set("payload", getPayloadString(payload))
        .then(res => detectServerError(res))
        
    },

    async deployApp(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/deploy')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .set("payload", getPayloadString(payload))
        .then(res => detectServerError(res))
        
    },

    async loginAdmin2FA(params) {
        return request(global.server)
        .post('/api/admins/login/2fa')
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async setAdmin2FA(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/admins/2fa/set')
        .set("authorization", "Bearer " + bearerToken).set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async authUser(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/users/auth')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .set("payload", getPayloadString(payload))
        .then(res => detectServerError(res))
        
    },
    async loginUser2FA(params) {
        return request(global.server)
        .post('/api/users/login/2fa')
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async setUser2FA(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/users/2fa/set')
        .set("authorization", "Bearer " + bearerToken).set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async getDepositAddress(params){
        return request(global.server)
        .post(`/api/app/address/get`)
        .send(params)
        .then(res => detectServerError(res))
    },
    async registerApp(params) {
        return request(global.server)
        .post('/api/app/create')
        .send(params)
        .then(res => detectServerError(res))
    },
    async getAdminByApp(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/admin/app/get')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async getApp(params) {
        return request(global.server)
        .post('/api/app/get')
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async getAppAuth(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/get/auth')
        .set("authorization", "Bearer " + bearerToken).set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async getUserAuth(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/users/auth')
        .set("authorization", "Bearer " + bearerToken).set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async getGames(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/games/getAll')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async getAppSummary(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/summary')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async addAppServices(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/services/add')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async addCurrencyWalletToApp(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/wallet/currency/add')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async deposit(params, pk) {
        try{
            let acc = new account(global.web3, global.web3.eth.accounts.privateKeyToAccount(pk));
            let balance = await acc.getBalance();
            if(balance <= 0.001){ throw new Error('Not Enought Funds to do Tests on current ETH Address')}
            await acc.sendEther(0.001, params.address);
        }catch(err){
            throw err
        }
    },
    async getTransactions(params, bearerToken) {
        return request(global.server)
        .post('/api/app/transactions')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async getAppLastBets(params) {
        return request(global.server)
        .post('/api/app/lastBets')
        .send(params)
        .then(res => detectServerError(res))
    },
    async getAppBiggestBetWinners(params) {
        return request(global.server)
        .post('/api/app/biggestBetWinners')
        .send(params)
        .then(res => detectServerError(res))
    },
    async getAppBiggestUserWinners(params) {
        return request(global.server)
        .post('/api/app/biggestUserWinners')
        .send(params)
        .then(res => detectServerError(res))
    },
    async resetPassword(params) {
        return request(global.server)
        .post('/api/users/password/reset/ask')
        .send(params)
        .then(res => detectServerError(res))
    },
    async setPassword(params) {
        return request(global.server)
        .post('/api/users/password/reset/set')
        .send(params)
        .then(res => detectServerError(res))
    },
    async getAppPopularNumbers(params) {
        return request(global.server)
        .post('/api/app/popularNumbers')
        .send(params)
        .then(res => detectServerError(res))
    },
    async getUserInfo(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/user/get')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async getAppUsers(params, bearerToken, payload) {
        return request(global.server)
        .post('/api/app/users')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async createGame(params, bearerToken){
        return request(global.server)
        .post('/api/app/games/add')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async getUserBets(params, bearerToken, payload){
        return request(global.server)
        .post('/api/users/bets')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async createEvent(params, bearerToken){
        return request(global.server)
        .post('/api/app/events/add')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async placeBet(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/games/bet/place')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res)) 
    },
    async setMaxBet(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/games/bet/max')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res)) 
    },
    async pingPost(params, bearerToken, payload){
        return request(global.server)
        .post('/api/ping/post')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editTableLimit(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/games/editTableLimit')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async editGameEdge(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/games/editEdge')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editGameImage(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/games/editImage')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editGameBackgroundImage(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/games/editBackgroundImage')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editTopBarCustomizationApp(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/customization/topBar')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editBannersCustomizationApp(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/customization/banners')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editLogoCustomizationApp(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/customization/logo')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editColorsCustomizationApp(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/customization/colors')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editFooterCustomizationApp(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/customization/footer')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editTopIconCustomizationApp(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/customization/topIcon')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editLoadingGifCustomizationApp(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/customization/loadingGif')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editTypographyApp(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/typography')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => { return res.body})
    },
    async editAppIntegration(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/integrations/edit')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editAppMailSenderIntegration(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/integrations/mailSender/edit')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async resolveEvent(params, bearerToken){
        return request(global.server)
        .post('/api/app/games/events/resolve')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .then(res => detectServerError(res))
    },
    async webhookConfirmDepositFromBitgo(params, id, currency_id){
        return request(global.server)
        .post(`/api/app/webhookBitgoDeposit?id=${id}&currency=${currency_id}`)
        .send(params)
        .then(res => detectServerError(res))
    },
    async setAppMaxDeposit(params, bearerToken, payload){
        return request(global.server)
        .post('/api/deposit/max/set')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async updateUserWallet(params, id, app_id, currency_id){
        return request(global.server)
        .post(`/api/users/updateWallet?id=${id}&app=${app_id}&currency=${currency_id}`)
        .send(params)
        .then(res => detectServerError(res))
    },
    async requestWithdraw(params, bearerToken, payload){
        return request(global.server)
        .post('/api/users/requestWithdraw')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async cancelAppWithdraw(params, bearerToken){
        return request(global.server)
        .post('/api/app/cancelWithdraw')
        .set("authorization", "Bearer " + bearerToken)
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async requestAppWithdraw(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/requestWithdraw')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => {return res.body})    
    },

    async getEcosystemData(params){
        return request(global.server)
        .get('/api/ecosystem/all')
        .send(params)
        .then(res => detectServerError(res))
        
    },
    async getEcosystemCasinoGames(params){
        return request(global.server)
        .get('/api/ecosystem/games/casino')
        .send(params)
        .then(res => detectServerError(res))
    },
    async addGame(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/games/add')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async editAffiliateStructure(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/affiliate/edit')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async setCustomAffiliateStructureToUser(params, bearerToken, payload){
        return request(global.server)
        .post('/api/app/affiliate/custom/add')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
    async deployPlatformContract({tokenAddress, tokenAmount, maxDeposit, maxWithdrawal, decimals, authorizedAddress, acc=null}){
        try{
            let erc20Contract = globalsTest.getERC20Contract(tokenAddress);

            let casino = new CasinoContract({
                web3 : global.web3,
                authorizedAddress,
                account : acc ? acc : new account(global.web3, global.web3.eth.accounts.privateKeyToAccount(global.ownerAccount.getPrivateKey())), 
                erc20TokenContract : erc20Contract,
                decimals : decimals,
                tokenTransferAmount : tokenAmount
            })
           

            let res = await casino.__init__();
            await casino.setMaxWithdrawal(maxWithdrawal);
            await casino.setMaxDeposit(maxDeposit);

            return {    
                platformTokenAddress    : tokenAddress,
                transactionHash         : res.transactionHash,
                platformAddress         : casino.getAddress(),
                platformBlockchain      : 'eth',
                amount                  : res.amount,
                casinoContract          : casino
            };
            
        }catch(err){
            console.log(err)
            return false;
        }
    },
    async changeWithdrawalTimeApp({casinoContract, time}){
        try{
            await casinoContract.changeWithdrawalTimeLimit({time});
            return true
            
        }catch(err){
            console.log(err)
            return false;
        }
    },
    async depositUser({amount, platformAddress, tokenAddress, nonce, acc=null}){
        try{
            let erc20Contract = globalsTest.getERC20Contract(tokenAddress);

            let casinoContract = new CasinoContract({
                web3 : global.web3,
                account : acc ? acc : global.userAccount,
                erc20TokenContract : erc20Contract,
                contractAddress: platformAddress,
                decimals: 18
            })
            

            /* Deposit Tokens */
            return await casinoContract.depositFunds({
                amount,
                nonce : nonce
            });

        }catch(err){
            throw err;
        }
    },
    async directDepositUser({amount, platformAddress, tokenAddress, nonce, acc=null}){
        try{
            let erc20Contract = globalsTest.getERC20Contract(tokenAddress);

            let casinoContract = new CasinoContract({
                web3 : global.web3,
                account : acc ? acc : global.userAccount,
                erc20TokenContract : erc20Contract,
                contractAddress: platformAddress,
                decimals: 18
            })
            let amountWithDecimals = Numbers.toSmartContractDecimals(amount, 18);

            /* Deposit Tokens Directly */
            return await casinoContract.sendTokensToCasinoContract(amountWithDecimals);

        }catch(err){
            throw err;
        }
    },
    async pauseContract({casinoContract}){
        try{
            await casinoContract.pauseContract();
            return true
            
        }catch(err){
            console.log(err)
            return false;
        }
    },
    async unpauseContract({casinoContract}){
        try{
            await casinoContract.unpauseContract();
            return true
            
        }catch(err){
            console.log(err)
            return false;
        }
    },
    async isPaused({casinoContract}){
        try{
            return await casinoContract.isPaused();
        }catch(err){
            console.log(err)
            return false;
        }
    },
};




function getPayloadString(payloadObject){
    if(!payloadObject){return null}
    return JSON.stringify({ id : payloadObject.id })
}


function detectServerError(res){
    if(res.body && !_.isEmpty(res.body)){
        // Nothing
    }else{
        //Error on Server that does not show on testing since mocha hides server logs sometimes 
        console.log(res.error);
    }

    return res.body;
}