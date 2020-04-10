
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    bet: (object) => {
        return {
            "bet": {
                "result": !object.bet.result ? [] : object.bet.result.map(result => {
                    return ({
                        _id: result._id,
                        place: result.place,
                        value: result.value,
                        __v: result.__v
                    })
                }),
                "isResolved": object.bet.isResolved,
                "_id": object.bet._id,
                "currency": object.bet.currency,
                "user": object.bet.user,
                "app": object.bet.app,
                "outcomeResultSpace": {
                    "key": object.bet.outcomeResultSpace.key,
                    "start": object.bet.outcomeResultSpace.start,
                    "end": object.bet.outcomeResultSpace.end,
                    "probability": object.bet.outcomeResultSpace.probability,
                    "index": object.bet.outcomeResultSpace.index
                },
                "isWon": object.bet.isWon,
                "game": object.bet.game,
                "winAmount": object.bet.winAmount,
                "betAmount": object.bet.betAmount,
                "fee": object.bet.fee,
                "timestamp": object.bet.timestamp,
                "nonce": object.bet.nonce,
                "clientSeed": object.bet.clientSeed,
                "serverHashedSeed": object.bet.serverHashedSeed,
                "serverSeed": object.bet.serverSeed,
                "__v": object.bet.__v,
            },
            "user_in_app": object.user_in_app,
            "isUserWithdrawingAPI": object.isUserWithdrawingAPI,
            "isAppWithdrawingAPI": object.isAppWithdrawingAPI,
            "user_delta": object.user_delta,
            "app_delta": object.app_delta,
            "isUserAffiliated": object.isUserAffiliated,
            "affiliateReturns": !object.affiliateReturns ? [] : object.affiliateReturns.map(affiliate_return_id => {
                return({
                    "_id": affiliate_return_id
                })
            }),
            "totalAffiliateReturn": object.totalAffiliateReturn,
            "appWallet": !object.appWallet ? {} : {
                "_id": object.appWallet._id,
                "playBalance": object.appWallet.playBalance,
                "max_deposit": object.appWallet.max_deposit,
                "max_withdraw": object.appWallet.max_withdraw,
                "depositAddresses": object.appWallet.depositAddresses ? object.appWallet.depositAddresses.map(depositAddress_id => {
                    return({
                        "_id": depositAddress_id
                    })
                }) : object.appWallet.depositAddresses,
                "link_url": object.appWallet.link_url,
                "currency": {
                    "_id": object.appWallet.currency._id,
                    "image": object.appWallet.currency.image,
                    "ticker": object.appWallet.currency.ticker,
                    "decimals": object.appWallet.currency.decimals,
                    "name": object.appWallet.currency.name,
                    "address": object.appWallet.currency.address
                },
                "bitgo_id": object.appWallet.bitgo_id,
                "bank_address": object.appWallet.bank_address
            },
            "currency": object.currency,
            "tableLimit": object.tableLimit,
            "wallet": !object.wallet ? {} : {
                "_id": object.wallet._id,
                "playBalance": object.wallet.playBalance,
                "max_deposit": object.wallet.max_deposit,
                "max_withdraw": object.wallet.max_withdraw,
                "depositAddresses": object.wallet.depositAddresses ? object.wallet.depositAddresses.map(deposit_address => {
                    return ({
                        "_id": deposit_address._id,
                        "currency": deposit_address.currency,
                        "user": deposit_address.user,
                        "bitgo_id": deposit_address.bitgo_id,
                    })
                }) : object.wallet.depositAddresses,
                "link_url": object.wallet.link_url,
                "currency": {
                    "_id": object.wallet.currency._id,
                    "image": object.wallet.currency.image,
                    "ticker": object.wallet.currency.ticker,
                    "decimals": object.wallet.currency.decimals,
                    "name": object.wallet.currency.name,
                    "address": object.wallet.currency.address
                }
            },
            "user": object.user,
            "app": object.app,
            "outcomeResultSpace": {
                "key": object.outcomeResultSpace.key,
                "start": object.outcomeResultSpace.start,
                "end": object.outcomeResultSpace.end,
                "probability": object.outcomeResultSpace.probability,
                "index": object.outcomeResultSpace.index
            },
            "isWon": object.isWon,
            "game": object.game,
            "betSystem": object.betSystem,
            "appPlayBalance": object.appPlayBalance,
            "playBalance": object.playBalance,
            "possibleWinAmount": object.possibleWinAmount,
            "possibleWinBalance": object.possibleWinBalance,
            "winAmount": object.winAmount,
            "betAmount": object.betAmount,
            "fee": object.fee,
            "result": object.result.map(result => {
                return ({
                    _id: result._id,
                    place: result.place,
                    value: result.value
                })
            }),
            "timestamp": object.timestamp,
            "nonce": object.nonce,
            "clientSeed": object.clientSeed,
            "serverHashedSeed": {
                "$super": {
                    "$super": {}
                },
                "words": !object.serverHashedSeed.words ? [] : object.serverHashedSeed.words.map(word => word),
                "sigBytes": object.sigBytes
            },
            "serverSeed": object.serverSeed,
            "isResolved": object.isResolved
        }
    },
}


class MapperBet {

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
            Bet: 'bet'
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

let MapperBetSingleton = new MapperBet();

export {
    MapperBetSingleton
}