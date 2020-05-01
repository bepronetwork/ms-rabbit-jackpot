
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    getCasinoGames: (object) => {
        return object.map(object => {
            return ({
                "_id": object._id,
                "name": object.name,
                "metaName": object.metaName,
                "description": object.description,
                "image_url": object.image_url,
                "isValid": object.isValid,
                "rules": object.rules,
                "resultSpace": object.resultSpace ? object.resultSpace.map(resultSpace => {
                    return ({
                        "_id": resultSpace._id,
                        "formType": resultSpace.formType,
                        "probability": resultSpace.probability,
                        "__v": resultSpace.__v
                    })
                }) : object.resultSpace,
                "__v": object.__v,
            })
        })
    }
}


class MapperGetCasinoGames {

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
            GetCasinoGames: 'getCasinoGames'
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

let MapperGetCasinoGamesSingleton = new MapperGetCasinoGames();

export {
    MapperGetCasinoGamesSingleton
}