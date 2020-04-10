
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    addCurrencyWallet: (object) => {
        return {
            "currency_id": object.currency_id,
            "bank_address": object.bank_address,
            "keys": !object.keys ? {} : {
                "user": !object.keys.user ? {} : {
                    "id": object.keys.user.id,
                    "pub": object.keys.user.pub,
                    "ethAddress": object.keys.user.ethAddress,
                    "encryptedPrv": object.keys.user.encryptedPrv,
                    "prv": object.keys.user.prv,
                },
                "backup": !object.keys.backup ? {} : {
                    "id": object.keys.backup.id,
                    "pub": object.keys.backup.pub,
                    "ethAddress": object.keys.backup.ethAddress,
                    "prv": object.keys.backup.prv,
                    "source": object.keys.backup.source,
                },
                "bitgo": !object.keys.bitgo ? {} : {
                    "id": object.keys.bitgo.id,
                    "pub": object.keys.bitgo.pub,
                    "ethAddress": object.keys.bitgo.ethAddress,
                    "isBitGo": object.keys.bitgo.isBitGo
                },
            }
        }
    },
}


class MapperAddCurrencyWallet {

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
            AddCurrencyWallet: 'addCurrencyWallet'
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

let MapperAddCurrencyWalletSingleton = new MapperAddCurrencyWallet();

export {
    MapperAddCurrencyWalletSingleton
}