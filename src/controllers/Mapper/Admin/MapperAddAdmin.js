
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    addAdmin: (object) => {
        return {
            "_id": object._id,
            "username": object.username,
            "name": object.name,
            "security": {
                "_id": object.security._id,
                "2fa_set": object.security['2fa_set'],
                "email_verified": object.security.email_verified,
                "bearerToken": object.security['bearerToken'],
            },
            "email": object.email,
            "app": !object.app ? {} : {
                "id": object.app._id,
                "isValid": object.app.isValid,
                "games": object.app.games ? object.app.games.map(game_id => {
                    return ({
                        "_id": game_id
                    })
                }) : object.app.games,
                "listAdmins": object.app.listAdmins ? object.app.listAdmins.map(list_admin_id => {
                    return ({
                        "_id": list_admin_id
                    })
                }) : object.app.listAdmins,
                "services": object.app.services ? object.app.services.map(service => service) : object.app.services,
                "currencies": object.app.currencies ? object.app.currencies.map(currency => {
                    return ({
                        "_id": currency._id,
                        "image": currency.image,
                        "ticker": currency.ticker,
                        "decimals": currency.decimals,
                        "name": currency.name,
                        "address": currency.address
                    })
                }) : object.app.currencies,
                "users": object.app.users ? object.app.users.map(user_id => {
                    return ({
                        "_id": user_id
                    })
                }) : object.app.users,
                "external_users": object.app.external_users ? object.app.external_users.map(external_user_id => external_user_id) : object.app.external_users,
                "wallet": object.app.wallet ? object.app.wallet.map(wallet => {
                    return ({
                        "_id": wallet._id,
                        "playBalance": wallet.playBalance,
                        "max_deposit": wallet.max_deposit,
                        "max_withdraw": wallet.max_withdraw,
                        "depositAddresses": wallet.depositAddresses ? wallet.depositAddresses.map(depositAddress_id => { return ({_id: depositAddress_id}) } ) : wallet.depositAddresses,
                        "link_url": wallet.link_url,
                        "currency": {
                            "_id": wallet.currency._id,
                            "image": wallet.currency.image,
                            "ticker": wallet.currency.ticker,
                            "decimals": wallet.currency.decimals,
                            "name": wallet.currency.name,
                            "address": wallet.currency.address
                        },
                        "bitgo_id": wallet.bitgo_id,
                        "bank_address": wallet.bank_address
                    })
                }) : object.app.wallet,
                "deposits": object.app.deposits ? object.app.deposits.map(deposit_id => {
                    return ({
                        "_id": deposit_id
                    })
                }) : object.app.deposits,
                "withdraws": object.app.withdraws ? object.app.withdraws.map(withdraw_id => {
                    return ({
                        "_id": withdraw_id
                    })
                }) : object.app.withdraws,
                "typography": object.app.typography ? { name: object.app.typography.name, url: object.app.typography.url} : object.app.typography,
                "countriesAvailable": object.app.countriesAvailable ? object.app.countriesAvailable.map(country_available => country_available) : object.app.countriesAvailable,
                "licensesId": object.app.licensesId ? object.app.licensesId.map(license_id => license_id) : object.app.licensesId,
                "isWithdrawing": object.app.isWithdrawing,
                "name": object.app.name,
                "affiliateSetup": object.app.affiliateSetup,
                "customization": !object.customization ? {} : {
                    "_id": object.customization._id,
                    "colors": object.customization.colors ? object.customization.colors.map(color => {
                        return ({
                            "_id": color._id,
                            "type": color.type,
                            "hex": color.hex
                        })
                    }) : object.customization.colors,
                    "topBar": !object.customization.topBar ? {} : {
                        "_id": object.customization.topBar._id,
                        "isActive": object.customization.topBar.isActive,
                        "backgroundColor": object.customization.topBar.backgroundColor,
                        "text": object.customization.topBar.text,
                        "textColor": object.customization.topBar.textColor,
                    },
                    "banners": !object.customization.banners ? {} : {
                        "_id": object.customization.banners._id,
                        "autoDisplay": object.customization.banners.autoDisplay,
                        "ids": !object.customization.banners.ids ? [] : object.customization.banners.ids.map(id => {
                            return ({
                                "_id": id._id,
                                "image_url": id.image_url,
                                "link_url": id.link_url,
                                "button_text": id.button_text,
                                "title": id.title,
                                "subtitle": id.subtitle,
                            })
                        })
                    },
                    "logo": !object.customization.logo ? {} : {
                        "_id": object.customization.logo._id,
                        "id": !object.customization.logo.id ? '' : object.customization.logo.id
                    },
                    "footer": !object.customization.footer ? {} : {
                        "_id": object.customization.footer._id,
                        "supportLinks": !object.customization.footer.supportLinks ? [] : object.customization.footer.supportLinks.map(support_link => {
                            return ({
                                "_id": support_link._id,
                                "name": support_link.name,
                                "href": support_link.href,
                            })
                        }),
                        "communityLinks": !object.customization.footer.communityLinks ? [] : object.customization.footer.communityLinks.map(community_link => {
                            return ({
                                "_id": community_link._id,
                                "name": community_link.name,
                                "href": community_link.href,
                            })
                        })
                    },
                    "topIcon": !object.customization.topIcon ? {} : {
                        "_id": object.customization.topIcon._id,
                        "id": !object.customization.topIcon.id ? '' : object.customization.topIcon.id
                    },
                    "loadingGif": !object.customization.loadingGif ? {} : {
                        "_id": object.customization.loadingGif._id,
                        "id": !object.customization.loadingGif.id ? '' : object.customization.loadingGif.id
                    },
                },
                "integrations": !object.integrations ? {} : {
                    "_id": object.integrations._id,
                    "chat": !object.integrations.chat ? {} : {
                        "id": object.integrations.chat._id,
                        "isActive": object.integrations.chat.isActive,
                        "name": object.integrations.chat.name,
                        "metaName": object.integrations.chat.metaName,
                        "link": object.integrations.chat.link,
                        "privateKey": object.integrations.chat.privateKey,
                        "publicKey": object.integrations.chat.publicKey,
                        "token": object.integrations.chat.token
                    },
                    "mailSender": !object.integrations.mailSender ? {} : {
                        "_id": object.integrations.mailSender._id,
                        "apiKey": object.integrations.mailSender.apiKey,
                        "templateIds": !object.integrations.mailSender.templateIds ? [] : object.integrations.mailSender.templateIds.map(template => {
                            return ({
                                "template_id": template.template_id,
                                "functionName": template.functionName,
                                "contactlist_Id": template.contactlist_Id
                            })
                        }),
                    },
                    "pusher": !object.integrations.pusher ? {} : {
                        "key": object.integrations.pusher.key
                    },
                },
                "description": object.app.description,
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


class MapperAddAdmin {

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
            AddAdmin: 'addAdmin'
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

let MapperAddAdminSingleton = new MapperAddAdmin();

export {
    MapperAddAdminSingleton
}