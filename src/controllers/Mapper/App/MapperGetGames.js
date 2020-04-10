
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    getGames: (object) => {
        return object.map(object => {
            return ({
                "_id": object._id,
                "resultSpace": !object.resultSpace ? [] : object.resultSpace.map(result_space => {
                    return ({
                        "_id": result_space._id,
                        "formType": result_space.formType,
                        "probability": result_space.probability,
                        "multiplier": !result_space.multiplier ? '' : result_space.multiplier,
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
                }) : object.wallets
            })
        })
    },
}


class MapperGetGames {

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
            GetGames: 'getGames'
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

let MapperGetGamesSingleton = new MapperGetGames();

export {
    MapperGetGamesSingleton
}