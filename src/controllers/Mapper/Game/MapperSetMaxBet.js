
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    setMaxBet: (object) => {
        return {
            "_id": object._id,
            "resultSpace": !object.resultSpace ? [] : object.resultSpace.map(result_space_id => {
                return({
                    "_id": result_space_id
                })
            }),
            "result": object.result ? object.result.map(result_id => {
                return({
                    "_id": result_id
                })
            }) : object.result,
            "bets": object.bets ? object.bets.map(bet_id => {
                return({
                    "_id": bet_id
                })
            }) : object.bets,
            "isClosed": object.isClosed,
            "maxBet": object.maxBet,
            "background_url": object.background_url,
            "name": object.name,
            "edge": object.edge,
            "app": object.app,
            "betSystem": object.betSystem,
            "timestamp": object.timestamp,
            "image_url": object.image_url,
            "metaName": object.metaName,
            "rules": object.rules,
            "description": object.description,
            "wallets": object.wallets ? object.wallets.map(wallet => {
                return ({
                    "_id": wallet._id,
                    "wallet": wallet.wallet,
                    "tableLimit": wallet.tableLimit,
                })
            }) : object.wallets,
            "__v": object.__v,
        }
    },
}


class MapperSetMaxBet {

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
            SetMaxBet: 'setMaxBet'
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

let MapperSetMaxBetSingleton = new MapperSetMaxBet();

export {
    MapperSetMaxBetSingleton
}