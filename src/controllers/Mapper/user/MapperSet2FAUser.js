
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    set2faUser: (object) => {
        return {
            "newSecret": object.newSecret,
            "username": object.username,
            "isVerifiedToken2FA": object.isVerifiedToken2FA,
            "user_id": object.user_id,
            "security_id": object.security_id,
        }
    },
}


class MapperSet2faUser {

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
            Set2faUser: 'set2faUser'
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

let MapperSet2faUserSingleton = new MapperSet2faUser();

export {
    MapperSet2faUserSingleton
}