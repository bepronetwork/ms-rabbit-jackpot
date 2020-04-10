import chai from 'chai';
const expect = chai.expect;


export async function digestBetResult({newBalance, res, previousBalance}){
    const { winAmount, betAmount, fee, isWon, outcomeResultSpace, result, user_delta} = res.data.message;
    console.log(winAmount, isWon, user_delta, newBalance, previousBalance)
    if(isWon){
        // Confirm delta is positive
        expect(user_delta).to.be.greaterThan(0);
        // Confirm Win Amount is Positive
        expect(winAmount).to.be.greaterThan(0);
        // Confirm New User Balance is equal to previous plus delta
        expect(newBalance).to.be.equal(previousBalance+user_delta);
    }else{
        // Confirm delta is negative
        expect(user_delta).to.be.lessThan(0);
        // Confirm Win Amount is 0
        expect(winAmount).to.be.equal(0);
        // Confirm New User Balance is equal to previous plus delta
        expect(newBalance).to.be.equal(previousBalance+user_delta);
    }
    return true;
}

export async function getUserAuth({username, password, app}){
    let res = await loginUser({username, password, app});
    detectValidationErrors(res);
    let USER_BEARER_TOKEN = res.data.message.bearerToken;
    let USER_ID = res.data.message.id;
    let USER_ADDRESS = res.data.message.address;
    let WITHDRAWS = res.data.message.withdraws;
    let USER_BALANCE = res.data.message.wallet.playBalance;
    return { USER_ID, USER_BEARER_TOKEN, USER_BALANCE, USER_ADDRESS, WITHDRAWS };
}

export async function getWithdrawAmount({casinoContract, address, decimals}){
    return await casinoContract.getApprovedWithdrawAmount({address, decimals});
} 

export async function getAllContractLiquidity({casinoContract}){
    return await casinoContract.getTotalLiquidity();
} 
