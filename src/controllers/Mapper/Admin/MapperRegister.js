
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    register: (object) => {
        return {
            "_id": object._id,
            "username": object.username,
            "name": object.name,
            "security": object.security,
            "email": object.email,
            "registered": object.registered,
            "permission": object.permission,
            "__v": object.__v
        }
    },
}


class MapperRegisterAdmin {

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
            Register: 'register'
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

let MapperRegisterAdminSingleton = new MapperRegisterAdmin();

export {
    MapperRegisterAdminSingleton
}