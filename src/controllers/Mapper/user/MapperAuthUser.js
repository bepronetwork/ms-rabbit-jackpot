
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    authUser: (object) => {
        return {
            "username": object.username,
            "email": object.email,
            "bearerToken": object.security.bearerToken,
            "id": object._id,
            "name": object.name,
            "email_confirmed": object.email_confirmed,
            "wallet": object.wallet ? object.wallet.map(wallet => {
                return ({
                    "_id": wallet._id,
                    "playBalance": wallet.playBalance,
                    "max_deposit": wallet.max_deposit,
                    "max_withdraw": wallet.max_withdraw,
                    "depositAddresses": wallet.depositAddresses ? wallet.depositAddresses.map(depositAddress_id => { return ({ _id: depositAddress_id }) }) : wallet.depositAddresses,
                    "link_url": wallet.link_url,
                    "currency": {
                        "_id": wallet.currency._id,
                        "image": wallet.currency.image,
                        "ticker": wallet.currency.ticker,
                        "decimals": wallet.currency.decimals,
                        "name": wallet.currency.name,
                        "address": wallet.currency.address
                    },
                })
            }) : object.wallet,
            "affiliateWallet": object.affiliate.wallet ? object.affiliate.wallet.map(affiliateWallet => {
                return ({
                    "_id": affiliateWallet._id,
                    "playBalance": affiliateWallet.playBalance,
                    "max_deposit": affiliateWallet.max_deposit,
                    "max_withdraw": affiliateWallet.max_withdraw,
                    "depositAddresses": affiliateWallet.depositAddresses ? affiliateWallet.depositAddresses.map(depositAddress_id => { return ({ _id: depositAddress_id }) }) : affiliateWallet.depositAddresses,
                    "link_url": affiliateWallet.link_url,
                    "currency": {
                        "_id": affiliateWallet.currency._id,
                        "image": affiliateWallet.currency.image,
                        "ticker": affiliateWallet.currency.ticker,
                        "decimals": affiliateWallet.currency.decimals,
                        "name": affiliateWallet.currency.name,
                        "address": affiliateWallet.currency.address
                    },
                })
            }) : object.affiliate.wallet,
            "withdraws": object.withdraws ? object.withdraws.map(withdraw => {
                return ({
                    "_id": withdraw._id,
                    "address": withdraw.address,
                    "user": withdraw.user,
                    "app": withdraw.app,
                    "creation_timestamp": withdraw.creation_timestamp,
                    "last_update_timestamp": withdraw.last_update_timestamp,
                    "currency": withdraw.currency,
                    "transactionHash": withdraw.transactionHash,
                    "logId": withdraw.logId,
                    "amount": withdraw.amount,
                    "withdraw_external_id": withdraw.withdraw_external_id,
                    "usd_amount": withdraw.usd_amount,
                    "nonce": withdraw.nonce,
                    "confirmed": withdraw.confirmed,
                    "callback_URL": withdraw.callback_URL,
                    "bitgo_id": withdraw.bitgo_id,
                    "confirmations": withdraw.confirmations,
                    "maxConfirmations": withdraw.maxConfirmations,
                    "done": withdraw.done,
                    "status": withdraw.status,
                    "isAffiliate": withdraw.isAffiliate,
                    "link_url": withdraw.link_url,
                })
            }) : object.withdraws,
            "deposits": object.deposits ? object.deposits.map(deposit => {
                return ({
                    "_id": deposit._id,
                    "address": deposit.address,
                    "user": deposit.user,
                    "app": deposit.app,
                    "creation_timestamp": deposit.creation_timestamp,
                    "last_update_timestamp": deposit.last_update_timestamp,
                    "currency": deposit.currency,
                    "transactionHash": deposit.transactionHash,
                    "amount": deposit.amount,
                    "deposit_external_id": deposit.withdraw_external_id,
                    "usd_amount": deposit.usd_amount,
                    "callback_URL": deposit.callback_URL,
                    "confirmations": deposit.confirmations,
                    "maxConfirmations": deposit.maxConfirmations,
                    "confirmed": deposit.confirmed,
                    "link_url": deposit.link_url
                })
            }) : object.deposits,
            "affiliateId": object.affiliateLink._id,
            "affilateLinkInfo": object.affiliateLink ? {
                "_id": object.affiliateLink._id,
                "parentAffiliatedLinks": object.affiliateLink.parentAffiliatedLinks ? object.affiliateLink.parentAffiliatedLinks.map(parentAffiliatedLink_id => parentAffiliatedLink_id) : object.affiliateLink.parentAffiliatedLinks,
                "isCustom": object.affiliateLink.isCustom,
                "userAffiliated": object.affiliateLink.userAffiliated,
                "affiliateStructure": {
                    "_id": object.affiliateLink.affiliateStructure._id,
                    "isActive": object.affiliateLink.affiliateStructure.isActive,
                    "level": object.affiliateLink.affiliateStructure.level,
                    "percentageOnLoss": object.affiliateLink.affiliateStructure.percentageOnLoss,
                },
                "affiliate": object.affiliateLink.affiliate,
            } : object.affiliateLink,
            "affiliateInfo": object.affiliate ? {
                "_id": object.affiliate._id,
                "wallet": object.affiliate.wallet ? object.affiliate.wallet.map(wallet => {
                    return ({
                        "_id": wallet._id,
                        "playBalance": wallet.playBalance,
                        "max_deposit": wallet.max_deposit,
                        "max_withdraw": wallet.max_withdraw,
                        "depositAddresses": wallet.depositAddresses ? wallet.depositAddresses.map(depositAddress_id => { return ({ _id: depositAddress_id }) }) : wallet.depositAddresses,
                        "link_url": wallet.link_url,
                        "currency": {
                            "_id": wallet.currency._id,
                            "image": wallet.currency.image,
                            "ticker": wallet.currency.ticker,
                            "decimals": wallet.currency.decimals,
                            "name": wallet.currency.name,
                            "address": wallet.currency.address
                        },
                    })
                }) : object.affiliate.wallet,
                "affiliatedLinks": object.affiliate.affiliatedLinks ? object.affiliate.affiliatedLinks.map(affiliatedLink_id => affiliatedLink_id) : object.affiliate.affiliatedLinks,
            } : object.affiliate,
            "security": {
                "id": object.security._id,
                "2fa_set": object.security['2fa_set'],
                "email_verified": object.security.email_verified,
                "bearerToken": object.security['bearerToken'],
            },
        }
    },
}


class MapperAuthUser {

    constructor() {
        self = {
            outputs: outputs
        }

        /**
         * @object KEYS for Output Mapping
         * @key Input of Output Function <-> Output for Extern of the API
         * @value Output of Function in Outputs
         */

        this.KEYS = {
            AuthUser: 'authUser'
        }
    }

    output(key, value) {
        try {
            return self.outputs[this.KEYS[key]](value);
        } catch (err) {
            throw err;
        }
    }
}

let MapperAuthUserSingleton = new MapperAuthUser();

export {
    MapperAuthUserSingleton
}