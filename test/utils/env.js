import { generateEthAccountWithTokensAndEthereum } from "./eth";
import { WalletsRepository } from "../../src/db/repos";

export async function createEthAccount({ethAmount, tokenAmount}){
    /* Create User Address and give it ETH */
    var eth_account = await generateEthAccountWithTokensAndEthereum({ETHAmount : ethAmount, tokenAmount : tokenAmount});
    return eth_account;
}


export async function provideFunds({wallet,  amount}){
    /* Update Balance of App */
    await WalletsRepository.prototype.updatePlayBalance(wallet, amount);
}

