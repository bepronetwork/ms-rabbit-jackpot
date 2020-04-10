
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    editAutoWithdraw: (object) => {
        return {
            "_id": object._id,
            "isAutoWithdraw": object.isAutoWithdraw,
            "verifiedKYC": object.verifiedKYC,
            "maxWithdrawAmountCumulative": !object.maxWithdrawAmountCumulative ? [] : object.maxWithdrawAmountCumulative.map(max_withdraw_amount_cumulative => {
                return ({
                    "_id": max_withdraw_amount_cumulative._id,
                    "amount": max_withdraw_amount_cumulative.amount,
                    "currency": max_withdraw_amount_cumulative.currency
                })
            }),
            "maxWithdrawAmountPerTransaction": !object.maxWithdrawAmountPerTransaction ? [] : object.maxWithdrawAmountPerTransaction.map(max_withdraw_amount_per_transaction => {
                return ({
                    "_id": max_withdraw_amount_per_transaction._id,
                    "amount": max_withdraw_amount_per_transaction.amount,
                    "currency": max_withdraw_amount_per_transaction.currency
                })
            }),
            "__v": object.__v,
        }
    },
}


class MapperEditAutoWithdraw {

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
            EditAutoWithdraw: 'editAutoWithdraw'
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

let MapperEditAutoWithdrawSingleton = new MapperEditAutoWithdraw();

export {
    MapperEditAutoWithdrawSingleton
}