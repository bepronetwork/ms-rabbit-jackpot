import {
    registerUser,
    getAppAuth,
    loginUser,
    editAffiliateStructure,
    placeBet,
    setCustomAffiliateStructureToUser,
    updateUserWallet
} from '../methods';
import { genData } from "../utils";
import models from "../models";
import Random from "../tools/Random";
import { generateEthAccount, userDepositToContract } from "../utils/eth";
import { getNonce } from '../lib';
import { provideFunds } from '../utils/env';


export async function createUser({app_id, affiliateLink}){
    /* Create ETH Account */
    //let user_eth_account = await createEthAccount({ethAmount : initialState.user.eth_balance, tokenAmount : initialState.user.token_balance});
    let user_eth_account = await generateEthAccount();
    /* Register User */
    
    var userPostData = genData(models.users.normal_register(user_eth_account.getAddress(), app_id, {
        username : 'User-' + Random(11, 234234),
        affiliateLink : affiliateLink
    }));
    await registerUser(userPostData);
    
    /* Login User */
    var data = (await loginUser(userPostData)).data;
    await provideFunds({wallet : data.message.wallet[0]._id, amount : 0.1});

    data.message.password = userPostData.password;
    /* Return User */
    return {...data, eth_account : user_eth_account};
}

export async function createUserDeposit({user, tokenAmount, app, currency,  depositAddress}){
    const { id : app_id} = app;
    const { id : user_id, eth_account, bearerToken } = user;
    let res_eth = await userDepositToContract({eth_account, platformAddress : depositAddress, tokenAmount : tokenAmount, currency});
    return await updateUserWallet({
        user :  user_id,
        amount : tokenAmount,
        app: app_id,
        currency : currency._id,
        nonce : getNonce(),
        transactionHash: res_eth.transactionHash
    }, bearerToken, {id : user_id});
}

export async function editAppStructure({app, admin, structures}){
    return await editAffiliateStructure({
        admin: admin.id,
        app : app.id,
        structures,
        affiliateTotalCut : structures.reduce( (acc, s) => acc+s.percentageOnLoss, 0)
    }, admin.security.bearerToken, {id : admin.id})
}

export async function addCustomAffiliateStructureToUser({app, admin, affiliatePercentage, user}){
    return await setCustomAffiliateStructureToUser({
        app : app.id,
        admin: admin.id,
        user, 
        affiliatePercentage
    }, admin.security.bearerToken, {id : admin.id})
}

export async function getApp({app, admin}){
    return (await getAppAuth({
        admin: admin.id,
        app : app.id,
    }, admin.security.bearerToken, {id : admin.id}))
}

export async function getUserInfo({user, app}){
    let password = user.password ? user.password : user.message.password;
    let username = user.username ? user.username : user.message.username;

    let res =  (await loginUser({
        username, 
        password,
        app : app.id
    }));

    return { ...res.data.message, password };
}


export async function bet({user, result, game, app, currency}){
    const { id : app_id} = app;
    const { _id : game_id } = game;
    const { id : user_id, bearerToken } = user;

    const postData = {
        game: game_id,
        user: user_id,
        app: app_id,
        nonce: getNonce(),
        result,
        currency : currency._id
    }   

    return await placeBet(postData, bearerToken, {id : user_id});

}