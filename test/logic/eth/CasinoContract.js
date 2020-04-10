import {
    casino
} from "./interfaces";
import contract from "./models/contract";
import { fromBigNumberToInteger, fromDecimals, fromExponential } from "../services/services";
import ERC20TokenContract from "./ERC20Contract";

import Numbers from "../services/numbers";
let self;

class CasinoContract{

    constructor(params){
        try{
            let erc20TokenContract =  
                params.erc20TokenContract ? params.erc20TokenContract : 
                    new ERC20TokenContract({
                        web3 : params.web3,
                        contractAddress : params.tokenAddress
                    });

            self = {
                contract : 
                new contract({
                    web3 : params.web3,
                    contract : casino, 
                    address : params.contractAddress,
                    tokenTransferAmount : params.tokenTransferAmount
                }),
                erc20TokenContract,
                ...params
            }
        }catch(err){
            throw err
        }
      
    }

      /**
     * @constructor Starting Function
     */

    async __init__(){
        try{ 
            let contractDepolyed = await this.deploy();
            this.__assert(contractDepolyed);
            return {
                amount : self.tokenAddress,
                transactionHash : contractDepolyed.transactionHash
            };
        }catch(err){
            throw err;
        }
    }

    async authorize(addr){
        try{
            let data = await self.contract.getContract().methods.authorize(
                this.getAddress()
            ).encodeABI();
            let res =  await self.contract.send(self.account.getAccount(), data);
            return res;
        }catch(err){
            throw err;
        }   
    }
    
    isAuthorized = async (address) => {
        try{
            return await self.contract.getContract().methods.authorized(address).call();
        }catch(err){
            throw err;
        }   
    }



    __assert(){
        self.contract.use(
            casino,
            self.contractAddress
        );
    }

    /**
     * @constructor Starting Function
     */

  
    sendTokensToCasinoContract = async (tokenAmount, options, callback) => {
        try{
            let data = await self.erc20TokenContract.getContract().methods.transfer(
                self.contractAddress,
                tokenAmount
            ).encodeABI();
            let res = await self.erc20TokenContract.getABI().send(self.account.getAccount(), data, null, options, callback);
            return res;
        }catch(err){
            console.log(err)
            throw new Error(`Possibly the Owner Account Address : ${self.account.getAddress()} does not have ${tokenAmount} Tokens to send to the Contract (Providing Liquidity)`)
        }   
    }
    
    async start(){
        try{
            let balance = await self.account.getBalance();
            if(balance < 0.1){throw new Error(`Lack of Funds - Add more Funds to Address : ${self.account.getAddress()} to complete Testing`)}
        }catch(err){
            throw err;
        }
    }

    setAccount = (acc) => self.account = acc;

    async changeWithdrawalTimeLimit({time}){
        try{
            let SCTime = Numbers.fromMinutesToSmartContracTime(time);
            let data = await self.contract.getContract().methods.changeReleaseTime(
                SCTime
            ).encodeABI();
            let response = await self.contract.send(self.account.getAccount(), data);  
            return response;   
        }catch(err){
            throw err;
        }
    }


    async getWithdrawalTimeLimit(){
        try{
            return Numbers.fromSmartContractTimeToMinutes(await self.contract.getContract().methods.releaseTime().call());
        }catch(err){
            throw err
        }
    }

    async updateState({signature, nonce, newBalance, category, decimals}){
        try{          
            let data = await self.contract.getContract().methods.updateState(
                Numbers.toSmartContractDecimals(newBalance, decimals),
                nonce,
                category,
                signature.v,
                signature.r,
                signature.s).encodeABI();
            let response = await self.contract.send(self.account.getAccount(), data);  
            return response;   
        }catch(err){
            throw err;
        }   
    }

    async updatePlayersBalance({newPlayersBalance, decimals}){
        try{          
            let data = await self.contract.getContract().methods.updatePlayerBalance(
                Numbers.toSmartContractDecimals(newPlayersBalance, decimals)
            ).encodeABI();
            let response = await self.contract.send(self.account.getAccount(), data);  
            return response;   
        }catch(err){
            throw err;
        }   
    }

    async approveOwnerWithdrawal({newPlayersBalance, decimals, address, amount}){
        try{
            let data = await self.contract.getContract().methods.setOwnerWithdrawal(
                address, 
                Numbers.toSmartContractDecimals(newPlayersBalance, decimals),
                Numbers.toSmartContractDecimals(amount, decimals)
                ).encodeABI();
            let response = await self.contract.send(self.account.getAccount(), data);
            return response;  
        }catch(err){
            throw err;
        }
    }

    async getApprovedWithdrawAmount({address, decimals=self.decimals}){
        try{
            let res = await self.contract.getContract().methods.withdrawals(address).call();
            if(!res || (parseFloat(res) == 0)){
                return 0;
            }else{
                return Numbers.fromDecimals(res.amount, decimals)
            }
        }catch(err){
            throw err;
        }
    }

    async getHouseBalance(){
        try{
            let playersTokenAmount = await this.getPlayersBalance();
            let houseAmount = await this.getTotalLiquidity();
            return houseAmount - playersTokenAmount;
        }catch(err){
            return 'N/A';
        }
    }

    async getUserBalance(address){
        try{
            return fromBigNumberToInteger(await self.contract.getContract().methods.balances(address).call());
        }catch(err){
            throw err;
        }
    }

    async getPlayersBalance(){
        try{
            return fromBigNumberToInteger(await self.contract.getContract().methods.totalPlayerBalance().call());
        }catch(err){
            throw err;
        }
    }


    async getMaxDeposit(){
        try{
            return fromBigNumberToInteger(await self.contract.getContract().methods.maxDeposit().call());
        }catch(err){
            throw err;
        }
    }

    async setMaxWithdrawal(maxWithdrawal){
        try{
            let amountWithDecimals = Numbers.toSmartContractDecimals(maxWithdrawal, self.decimals);
            let data = self.contract.getContract().methods.changeMaxWithdrawal(amountWithDecimals).encodeABI(); 
            return await self.contract.send(self.account.getAccount(), data);  
        }catch(err){
            throw err
        }
    }

    async setMaxDeposit(maxDeposit){
        try{
            let amountWithDecimals = Numbers.toSmartContractDecimals(maxDeposit, self.decimals);
            let data = self.contract.getContract().methods.changeMaxDeposit(amountWithDecimals).encodeABI(); 
            return await self.contract.send(self.account.getAccount(), data);  
        }catch(err){
            throw err
        }
    }

    async getTotalLiquidity(){
        try{
            return fromBigNumberToInteger(await self.erc20TokenContract.getTokenAmount(this.getAddress()));
        }catch(err){
            throw err;
        }
    }

    async withdrawApp({receiverAddress, amount}){
        try{
            let amountWithDecimals = Numbers.toSmartContractDecimals(amount, self.decimals);
            let data = self.contract.getContract().methods.ownerWithdrawalTokens(
                receiverAddress,
                amountWithDecimals
            ).encodeABI(); 
            return await self.contract.send(self.account.getAccount(), data);  
        }catch(err){
            throw err;
        }
    }

    async approveWithdraw({address, amount, decimals}){
        try{
            let data = await self.contract.getContract().methods.setUserWithdrawal(
                address, 
                Numbers.toSmartContractDecimals(amount, decimals)
                ).encodeABI();
            let response = await self.contract.send(self.account.getAccount(), data);
            return response;  
        }catch(err){
            throw err;
        }
    }

    fromIntToFloatEthereum(int){
        return Math.round(int*100);
    }


    /**
     * @Functions
     */

    async deploy(){
            try{            
            
            let params = [
                self.erc20TokenContract.getAddress(),  // ERC-20 Token Contract
                self.account.getAddress(),             // Authorized Address
                self.account.getAddress()              // Owner Address
            ];
            let res = await self.contract.deploy(
                self.account.getAccount(), 
                self.contract.getABI(), 
                self.contract.getJSON().bytecode, 
                params);
            self.contractAddress = res.contractAddress;
            return res;
        }catch(err){
            throw err;
        }
    }

    getAddress(){
        return self.contractAddress;
    }

    async isPaused(){
        try{
            return await self.contract.getContract().methods.paused().call();
        }catch(err){
            throw err;
        }
    }

    async pauseContract(){
        try{
            let data = self.contract.getContract().methods.pause().encodeABI(); 
            return await self.contract.send(self.account.getAccount(), data);  
        }catch(err){
            throw err;
        }
    }

    async unpauseContract(){
        try{
            let data = self.contract.getContract().methods.unpause().encodeABI(); 
            return await self.contract.send(self.account.getAccount(), data);  
        }catch(err){
            throw err;
        }
    }


    async depositFunds({amount}){
        try{
            let amountWithDecimals = Numbers.toSmartContractDecimals(amount, self.decimals);
            return await this.sendTokensToCasinoContract(amountWithDecimals);
        }catch(err){
            throw err
        }
    }


    async allowWithdrawalFromContract({amount}){
        try{
            await self.erc20TokenContract.allowWithdrawalFromContract({
                account : self.account,
                amount,
                decimals : self.decimals,
                platformAddress  : self.contract.getAddress()
            })
            return true;
        }catch(err){
            throw err
        }
    }
}



export default CasinoContract;