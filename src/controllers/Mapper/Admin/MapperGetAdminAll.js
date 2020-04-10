
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    getAdminAll: (object) => {
        return object.map(object => {
            return ({
                "id": object._id,
                "username": object.username,
                "name": object.name,
                "security": object.security,
                "email": object.email,
                "app": object.app,
                "registered": object.registered,
                "permission": object.permission,
                "__v": object.__v
            })
        })
    },
}


class MapperGetAdminAll {

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
            GetAdminAll: 'getAdminAll'
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

let MapperGetAdminAllSingleton = new MapperGetAdminAll();

export {
    MapperGetAdminAllSingleton
}