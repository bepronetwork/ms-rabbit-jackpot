
let self;


/**
 * @Outputs 
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    getUsers: (object) => {
        return object.map(object => {
            return ({
                "_id": object._id,
                "bets": object.bets ? object.bets.map(bet_id => {
                    return({
                        "_id": bet_id
                    })
                }) : object.bets,
                "deposits": object.deposits ? object.deposits.map(deposit_id => {
                    return({
                        "_id": deposit_id
                    })
                }) : object.deposits,
                "withdraws": object.withdraws ? object.withdraws.map(withdraw_id => {
                    return({
                        "_id": withdraw_id
                    })
                }) : object.withdraws,
                "wallet": object.wallet ? object.wallet.map(wallet => {
                    return ({
                        "_id": wallet._id,
                        "playBalance": wallet.playBalance,
                        "max_deposit": wallet.max_deposit,
                        "max_withdraw": wallet.max_withdraw,
                        "depositAddresses": !wallet.depositAddresses ? [] : wallet.depositAddresses.map(deposit_address_id => {
                            return({
                                "_id": deposit_address_id
                            })
                        }),
                        "link_url": wallet.link_url,
                        "currency": wallet.currency
                    })
                }) : object.wallet,
                "username": object.username,
                "full_name": object.full_name,
                "affiliate": !object.affiliate ? {} : {
                    "wallet": object.affiliate.wallet ? object.affiliate.wallet.map(wallet => {
                        return ({
                            "_id": wallet._id,
                            "playBalance": wallet.playBalance,
                            "max_deposit": wallet.max_deposit,
                            "max_withdraw": wallet.max_withdraw,
                            "depositAddresses": !wallet.depositAddresses ? [] : wallet.depositAddresses.map(deposit_address_id => {
                                return({
                                    "_id": deposit_address_id
                                })
                            }),
                            "link_url": wallet.link_url,
                            "currency": wallet.currency
                        })
                    }) : object.wallet,
                },
                "name": object.name,
                "register_timestamp": object.register_timestamp,
                "nationality": object.nationality,
                "age": object.age,
                "email": object.email
            })
        })
    },
}


class MapperGetUsers {

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
            GetUsers: 'getUsers'
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

let MapperGetUsersSingleton = new MapperGetUsers();

export {
    MapperGetUsersSingleton
}