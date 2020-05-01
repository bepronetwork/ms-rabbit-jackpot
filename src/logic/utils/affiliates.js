
export function getAffiliatesReturn({affiliateLink, lostAmount, currency}){
    const { parentAffiliatedLinks } = affiliateLink;
    
    /* Get indirect values for parent affiliate */ 
    let affiliateParentReturns = parentAffiliatedLinks.map( parentAffiliatedLink => {
        const { percentageOnLoss, isActive } = parentAffiliatedLink.affiliateStructure;

        if(!isActive){ return null }
        if(!percentageOnLoss || (percentageOnLoss <= 0) || percentageOnLoss >= 1){return null}
        const parentAffiliateWalletId = parentAffiliatedLink.affiliate.wallet.find( w => new String(w.currency._id).toString() == new String(currency).toString());

        return {
            amount                      : parseFloat(lostAmount*percentageOnLoss),
            parentAffiliateWalletId     : parentAffiliateWalletId._id
        }

    }).filter(el => el != null)

    /* Get Total Affiliate Return */
    const totalAffiliateReturn = affiliateParentReturns.reduce( (acc, a) =>  acc + a.amount ,0);

    return {
        totalAffiliateReturn : totalAffiliateReturn,
        affiliateReturns : affiliateParentReturns
    };
    
}
