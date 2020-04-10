import account from "../logic/eth/models/account";
import { globalsTest } from "../GlobalsTest";
import faker from 'faker';

const detectValidationErrors = (res) => {
    if(res.message == 'Validation errors'){
        console.log(res.errors[0]);
        return true;
    }else{
        return false;
    }
}

const generateEthAccountWithTokensAndEthereum = async ({tokenAddress, tokenAmount, ETHAmount, decimals}) => {

    let acc = new account(global.web3, global.web3.eth.accounts.create());
    let erc20Contract = globalsTest.getERC20Contract(tokenAddress);
    //Transfer Tokens
    await erc20Contract.transferTokenAmount({fromAccount : global.masterAccount, toAddress : acc.getAddress(), tokenAmount : tokenAmount, decimals : decimals});
    //Transfer Ethereum
    await global.masterAccount.sendEther(ETHAmount, acc.getAddress());
    return acc;
}


const mochaAsync = (fn) => {
    return done => {
        fn.call().then(done, err => {
            done(err);
        });
    };
};

const genData = (data) => JSON.parse(faker.fake(JSON.stringify(data)));

const detectEqualFieldValueOccurences = (arr1, arr2, field) => {
    return arr1.reduce( (acc, a) => {
        const b = arr2.find( s => {  ((s[field] == a[field]) && (s.isActive)) });
        if(b){ return acc+1 }
        else{ return acc }
    }, 0)
}

const getCurrencyWallet = ({wallet, ticker}) => {
    return wallet.find( w => new String(w.currency.ticker).toLowerCase() == new String(ticker).toLowerCase())
}

export {
    getCurrencyWallet,
    genData,
    detectEqualFieldValueOccurences,
    detectValidationErrors,
    mochaAsync,
    generateEthAccountWithTokensAndEthereum
}