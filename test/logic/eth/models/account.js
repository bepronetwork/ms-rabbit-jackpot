const WEI = 1000000000;
const GAS_PRICE = 10000*WEI;

class account{
    constructor(web3, account){
        this.web3 = web3;
        this.account = account;
    }


    async getBalance(){
        let wei = await this.web3.eth.getBalance(this.getAddress());
        return this.web3.utils.fromWei(wei, 'ether')
    }

    getAddress(){
        return this.account.address;
    }

    getPrivateKey(){
        return this.account.privateKey;
    }

    getAccount(){
        return this.account
    }

    async sendEther(amount, address, data=null, options={}, callback){
        return new Promise( async (resolve, reject) => {
            try{
                let tx = {
                    data : data,
                    from  : this.getAddress(),
                    to : address,
                    gasPrice : options.gasPrice ? options.gasPrice : 20000000000,
                    gas : options.gas ? options.gas : 4000000,
                    value: this.web3.utils.toWei(amount.toString(), 'ether')
                }
                let result = await this.account.signTransaction(tx);
                this.web3.eth.sendSignedTransaction(result.rawTransaction)
                .on('confirmation', (confirmations, receipt) => {
                    resolve(receipt)
                })
                .on('error', (err) => {reject(err)})
                .on('receipt', (e) => {resolve(e)})
                .on('transactionHash', (tx) =>  callback ? callback(tx) : null);
            }catch(err){
                reject(err);
            }
        })
       
        return transaction;
    }

    getSignature({winBalance, nonce, category, decimals}){
        
        let message =  this.web3.utils.soliditySha3(
            {type: 'int128', value :  Numbers.fromExponential(Numbers.toSmartContractDecimals(winBalance, decimals))},
            {type: 'uint128', value: nonce},
            {type: 'uint8', value: category}
        );
    
        let response = this.getAccount().sign(message, this.getPrivateKey());

        return {
            signature : response,
            nonce,
            category,
            address : this.getAddress()
        };
    }


}


export default account;