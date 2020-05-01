

let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    updateMaxDeposit: (object) => {
        return {
            "_id": object._id,
            "depositAddresses": !object.depositAddresses ? [] : object.depositAddresses.map(deposit_address_id => {
                return({
                    "_id": deposit_address_id
                })
            }),
            "playBalance": object.playBalance,
            "max_deposit": object.max_deposit,
            "max_withdraw": object.max_withdraw,
            "link_url": object.link_url,
            "currency": object.currency,
            "bitgo_id": object.bitgo_id,
            "bank_address": object.bank_address
        }
    },
}


class MapperUpdateMaxDeposit {

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
            UpdateMaxDeposit: 'updateMaxDeposit'
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

let MapperUpdateMaxDepositSingleton = new MapperUpdateMaxDeposit();

export {
    MapperUpdateMaxDepositSingleton
}