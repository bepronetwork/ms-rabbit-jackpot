
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    summary: (object) => {
        return object.map(object => {
            return ({
                "_id": object._id,
                "wallet": object.wallet ? object.wallet.map(wallet => {
                    return ({
                        "_id": wallet._id,
                        "playBalance": wallet.playBalance,
                        "max_deposit": wallet.max_deposit,
                        "max_withdraw": wallet.max_withdraw,
                        "depositAddresses": !wallet.depositAddresses ? [] : wallet.depositAddresses.map(deposit_address_id => deposit_address_id),
                        "link_url": wallet.link_url,
                        "currency": wallet.currency,
                        "bitgo_id": wallet.bitgo_id,
                        "bank_address": wallet.bank_address
                    })
                }) : object.wallet,
            })
        })
    }
}


class MapperSummary {

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
            Summary: 'summary'
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

let MapperSummarySingleton = new MapperSummary();

export {
    MapperSummarySingleton
}