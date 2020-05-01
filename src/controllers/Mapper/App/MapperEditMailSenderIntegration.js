
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    editMailSenderIntegration: (object) => {
        return {
            "app": object.app,
            "apiKey": object.apiKey,
            "templateIds": !object.templateIds ? [] : object.templateIds.map(template => {
                return ({
                    "template_id": template.template_id,
                    "functionName": template.functionName,
                    "contactlist_Id": template.contactlist_Id
                })
            }),
            "admin": object.admin,
        }
    },
}


class MapperEditMailSenderIntegration {

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
            EditMailSenderIntegration: 'editMailSenderIntegration'
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

let MapperEditMailSenderIntegrationSingleton = new MapperEditMailSenderIntegration();

export {
    MapperEditMailSenderIntegrationSingleton
}