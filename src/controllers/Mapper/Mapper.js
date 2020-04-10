
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    admin : (object) => {
        return {
            "username"      : object.username,
            "email"         : object.email,
            "bearerToken"       : object.bearerToken,
            "name"          : object.name,
            "id"            : object._id,
            "app"           : !object.app ? {} : {
                "id"          : object.app._id,
                "name"        : object.app.name,
                "description" : object.app.description,
                "withdraws"   : object.app.withdraws,
                "isValid"     : object.app.isValid,
                "services"    : object.app.services,
                "games"       : object.app.games,
                "wallet"        : object.app.wallet
            },
            "security" : {
                "id"                    : object.security._id,
                "2fa_set"               : object.security['2fa_set'],
                "email_verified"        : object.security['email_verified'],
                "bearerToken"           : object.security['bearerToken'],
            }
        }
    },
    app : (object) => {
        return {
            "id"                    : object._id,
            "name"                  : object.name,
            "description"           : object.description,
            "isValid"               : object.isValid,
            "currencies"            : object.wallet.map( w => { return {bank_address : w.bank_address, ...w.currency._doc}}),
            "licensesId"            : object.licensesId,
            "customization"         : object.customization,
            "addOn"                 : object.addOn,
            "integrations"          : {
                "chat" : {
                    "publicKey" :  object.integrations.chat ? object.integrations.chat.publicKey : ''
                },
                "pusher" : object.integrations.pusher
            },
            "countriesAvailable"    : object.countriesAvailable,
            "games"                 : object.games ? object.games.map( game => {
                return {
                    _id : game._id,
                    edge : game.edge,
                    name : game.name,
                    rules : game.rules,
                    metaName : game.metaName,
                    image_url : game.image_url,
                    background_url : game.background_url,
                    description : game.description,
                    resultSpace : game.resultSpace,
                    wallets : game.wallets,
                    isClosed : game.isClosed
                }
            }) : [],
        }
    },
    appAuth : (object) => {
        return {
            "id"                    : object._id,
            "name"                  : object.name,
            "description"           : object.description,
            "ownerAddress"          : object.ownerAddress,
            "whitelistedAddresses"  : object.whitelistedAddresses ? {
                currency  : object.whitelistedAddresses.currency,
                addresses : object.whitelistedAddresses.addresses
            } : {},
            "croupierAddress"       : object.croupierAddress,
            "bearerToken"           : object.bearerToken,
            "isValid"               : object.isValid,
            "currencyTicker"        : object.currencyTicker,
            "decimals"              : object.decimals,
            "integrations"          : object.integrations,
            "hosting_id"            : object.hosting_id,
            "web_url"               : object.web_url,
            "services"              : object.services,
            "addOn"                 : object.addOn,
            "users"                 : object.users.map( u => { return {
                "wallet" : u.wallet,
                ...u
            }}),
            "customization"         : object.customization,
            "withdraws"             : object.withdraws,
            "deposits"              : object.deposits,
            "platformAddress"       : object.platformAddress,
            "platformBlockchain"    : object.platformBlockchain,
            "platformTokenAddress"  : object.platformTokenAddress,
            "licensesId"            : object.licensesId,
            "countriesAvailable"    : object.countriesAvailable,
            "games"                 : object.games,
            "affiliateSetup"        : object.affiliateSetup,
            "wallet"                : object.wallet
            
        }
    },
    user : (object) => {
        return {
            "username"          : object.username,
            "email"             : object.email,
            "id"                : object._id,
            "name"              : object.name,
            "address"           : object.address,
            "email_confirmed"   : object.email_confirmed,
            "wallet"            : object.wallet,
            "affiliateWallet"   : object.affiliate.wallet,
            "withdraws"         : object.withdraws,
            "bearerToken"       : object.bearerToken,
            "deposits"          : object.deposits,
            "verifiedAccounts"  : object.verifiedAccount,
            "integrations"      : object.integrations,
            "affiliateId"       : object.affiliateLink._id,
            "affilateLinkInfo"  : object.affiliateLink,
            "affiliateInfo"     : object.affiliate,
            "security" : {
                "id"                    : object.security._id,    
                "2fa_set"               : object.security['2fa_set'],
                "email_verified"        : object.security['email_verified'],
                "bearerToken"           : object.security['bearerToken'],
            }
        }
    },
    deposit : (object) => {
        return {
            "currency"      : object._doc.currency,
            "confirmed"     : object._doc.confirmed,
            "amount"        : object._doc.amount,
            "confirmations" : object._doc.confirmations,
            "id"            : object._doc._id,
            "invoice"       : object._doc.invoice,
            "usd_amount"    : object._doc.usd_amount,
            "address"       : object._doc.address,
            "user"          : object._doc.user,
            "app"           : object._doc.app,
        }
    }
}


class Mapper{

    constructor(){
        self = {
            outputs : outputs
        }

        /**
         * @object KEYS for Output Mapping
         * @key Input of Output Function <-> Output for Extern of the API
         * @value Output of Function in Outputs
         */

        this.KEYS = {
            User : 'user',
            Deposit : 'deposit',
            Admin : 'admin',
            App : 'app',
            AppAuth : 'appAuth'
        }
    }

    output(key, value){
        try{
            return self.outputs[this.KEYS[key]](value);
        }catch(err){
            throw err;
        }
    }
}

let MapperSingleton = new Mapper();

export{
    MapperSingleton
}