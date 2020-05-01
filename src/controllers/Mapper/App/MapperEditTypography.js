
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    editTypography: (object) => {
        return {
            "typography": object.typography ? { name: object.typography.name, url: object.typography.url} : object.typography,
            "app": !object.app ? {} : {
                "_id": object.app._id,
                "isValid": object.app.isValid,
                "games": object.app.games ? object.app.games.map(game => {
                    return ({
                        "_id": game._id,
                        "resultSpace": !game.resultSpace ? [] : game.resultSpace.map(result_space => {
                            return ({
                                "_id": result_space._id,
                                "formType": result_space.formType,
                                "probability": result_space.probability,
                                "multiplier": !result_space.multiplier ? '' : result_space.multiplier,
                            })
                        }),
                        "result": game.result ? game.result.map(result_id => {
                            return({
                                "_id": result_id
                            })
                        }) : game.result,
                        "bets": game.bets ? game.bets.map(bet_id => {
                            return({
                                "_id": bet_id
                            })
                        }) : game.bets,
                        "isClosed": game.isClosed,
                        "maxBet": game.maxBet,
                        "background_url": game.background_url,
                        "name": game.name,
                        "edge": game.edge,
                        "app": game.app,
                        "betSystem": game.betSystem,
                        "timestamp": game.isClosed,
                        "image_url": game.image_url,
                        "metaName": game.metaName,
                        "rules": game.rules,
                        "description": game.description,
                        "wallets": game.wallets ? game.wallets.map(wallet => {
                            return ({
                                "_id": wallet._id,
                                "wallet": wallet.wallet,
                                "tableLimit": wallet.tableLimit,
                            })
                        }) : game.wallets,
                    })
                }) : object.app.games,
                "listAdmins": object.app.listAdmins ? object.app.listAdmins.map(list_admin_id => {
                    return({
                        "_id": list_admin_id
                    })
                }) : object.app.listAdmins,
                "services": object.app.services ? object.app.services.map(service => service) : object.app.services,
                "currencies": object.app.currencies ? object.app.currencies.map(currency => {
                    return({
                        "_id": currency._id,
                        "image": currency.image,
                        "ticker": currency.ticker,
                        "decimals": currency.decimals,
                        "name": currency.name,
                        "address": currency.address
                    })
                }) : object.app.currencies,
                "users": object.app.users ? object.app.users.map(user => {
                    return ({
                        "bets": user.bets ? user.bets.map(bet_id => {
                            return({
                                "_id": bet_id
                            })
                        }) : user.bets,
                        "deposits": user.deposits ? user.deposits.map(deposit_id => {
                            return({
                                "_id": deposit_id
                            })
                        }) : user.deposits,
                        "withdraws": user.withdraws ? user.withdraws.map(withdraw_id => {
                            return({
                                "_id": withdraw_id
                            })
                        }) : user.withdraws,
                        "wallet": user.wallet ? user.wallet.map(wallet_id => {
                            return({
                                "_id": wallet_id
                            })
                        }) : user.wallet,
                        "isWithdrawing": user.isWithdrawing,
                        "email_confirmed": user.email_confirmed,
                        "_id": user._id,
                        "username": user.username,
                        "full_name": user.full_name,
                        "affiliate": user.affiliate,
                        "name": user.name,
                        "register_timestamp": user.register_timestamp,
                        "nationality": user.nationality,
                        "age": user.age,
                        "security": user.security,
                        "email": user.email,
                        "app_id": user.app_id,
                        "external_user": user.external_user,
                        "external_id": user.external_id,
                        "affiliateLink": user.affiliateLink
                    })
                }) : object.app.users,
                "external_users": object.app.external_users ? object.app.external_users.map(external_user_id => external_user_id) : object.app.external_users,
                "wallet": object.app.wallet ? object.app.wallet.map(wallet => {
                    return ({
                        "_id": wallet._id,
                        "playBalance": wallet.playBalance,
                        "max_deposit": wallet.max_deposit,
                        "max_withdraw": wallet.max_withdraw,
                        "depositAddresses": wallet.depositAddresses ? wallet.depositAddresses.map(deposit_address_id => deposit_address_id) : wallet.depositAddresses,
                        "link_url": wallet.link_url,
                        "currency": !wallet.currency ? {} : {
                            "_id": wallet.currency._id,
                            "image": wallet.currency.image,
                            "ticker": wallet.currency.ticker,
                            "decimals": wallet.currency.decimals,
                            "name": wallet.currency.name,
                            "address": wallet.currency.address,
                        },
                        "bitgo_id": wallet.bitgo_id,
                        "bank_address": wallet.bank_address
                    })
                }) : object.app.wallet,
                "deposits": object.app.deposits ? object.app.deposits.map(deposit_id => {
                    return({
                        "_id": deposit_id
                    })
                }) : object.app.deposits,
                "withdraws": object.app.withdraws ? object.app.withdraws.map(withdraw_id => {
                    return({
                        "_id": withdraw_id
                    })
                }) : object.app.withdraws,
                "typography": object.app.typography ? { name: object.app.typography.name, url: object.app.typography.url} : object.app.typography,
                "countriesAvailable": object.app.countriesAvailable ? object.app.countriesAvailable.map(country_available => country_available) : object.app.countriesAvailable,
                "licensesId": object.app.licensesId ? object.app.licensesId.map(license_id => license_id) : object.app.licensesId,
                "isWithdrawing": object.app.isWithdrawing,
                "name": object.app.name,
                "affiliateSetup": !object.app.affiliateSetup ? {} : {
                    "_id": object.app.affiliateSetup._id,
                    "isActive": object.app.affiliateSetup.isActive,
                    "affiliateStructures": object.app.affiliateSetup.affiliateStructures ? object.app.affiliateSetup.affiliateStructures.map(affiliate_structure => {
                        return ({
                            "_id": affiliate_structure._id,
                            "isActive": affiliate_structure.isActive,
                            "level": affiliate_structure.level,
                            "percentageOnLoss": affiliate_structure.percentageOnLoss
                        })
                    }) : object.app.affiliateSetup.affiliateStructures,
                    "customAffiliateStructures": object.app.affiliateSetup.customAffiliateStructures ? object.app.affiliateSetup.customAffiliateStructures.map(custom_affiliate_structure_id => custom_affiliate_structure_id) : object.app.affiliateSetup.customAffiliateStructures,
                },
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
                "integrations": !object.app.integrations ? {} : {
                    "_id": object.app.integrations._id,
                    "chat": !object.app.integrations.chat ? {} : {
                        "_id": object.app.integrations.chat._id,
                        "isActive": object.app.integrations.chat.isActive,
                        "name": object.app.integrations.chat.name,
                        "metaName": object.app.integrations.chat.metaName,
                        "link": object.app.integrations.chat.link,
                        "privateKey": object.app.integrations.chat.privateKey,
                        "publicKey": object.app.integrations.chat.publicKey,
                        "token": object.app.integrations.chat.token
                    },
                    "mailSender": !object.app.integrations.mailSender ? {} : {
                        "_id": object.app.integrations.mailSender._id,
                        "apiKey": object.app.integrations.mailSender.apiKey,
                        "templateIds": !object.app.integrations.mailSender.templateIds ? [] : object.app.integrations.mailSender.templateIds.map(template => {
                            return ({
                                "template_id": template.template_id,
                                "functionName": template.functionName,
                                "contactlist_Id": template.contactlist_Id
                            })
                        }),
                    },
                    "pusher": !object.app.integrations.pusher ? {} : {
                        "key": object.app.integrations.pusher.key
                    },
                },
                "description": object.app.description,
                "hosting_id": object.app.hosting_id,
                "web_url": object.app.web_url,
                "__v": object.app.__v,
            },
            "admin": object.admin,
        }
    },
}


class MapperEditTypography {

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
            EditTypography: 'editTypography'
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

let MapperEditTypographySingleton = new MapperEditTypography();

export {
    MapperEditTypographySingleton
}