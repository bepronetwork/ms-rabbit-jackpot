
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    login: (object) => {
        return {
            "has2FASet": object.has2FASet,
            "bearerToken": object.bearerToken,
            "username": object.username,
            "password": object.password,
            "security_id": object.security._id,
            "verifiedAccount": object.verifiedAccount,
            "id": object._id,
            "name": object.name,
            "security": {
                "id"                    : object.security._id,
                "2fa_set"               : object.security['2fa_set'],
                "email_verified"        : object.security['email_verified'],
                "bearerToken"           : object.security['bearerToken'],
            },
            "email": object.email,
            "app": {
                "id": object.app._id
            },
            "registered": object.registered,
            "permission": {
                "_id": object.permission._id,
                "super_admin": object.permission.super_admin,
                "customization": object.permission.customization,
                "withdraw": object.permission.withdraw,
                "user_withdraw": object.permission.user_withdraw,
                "financials": object.permission.financials
            },
            "__v": object.__v
        }
    },
}


class MapperLoginAdmin {

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
            Login: 'login'
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

let MapperLoginAdminSingleton = new MapperLoginAdmin();

export {
    MapperLoginAdminSingleton
}