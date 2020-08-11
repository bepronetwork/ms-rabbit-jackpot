require('dotenv').config();
const config = require('./config.json');
import { changeAllStringsInObjectRecursive } from '../helpers/object.js';

/* ENV */

export const ENV = process.env.ENV;

export const CLOUDAMQP_URL =  process.env.CLOUDAMQP_URL || "amqp://localhost:5672";

export const DB_USER =  process.env.DB_USER;

export const DB_PASSWORD =  process.env.DB_PASSWORD;

export const ETH_TEST_NET = process.env.ETH_NET; 

export const MONGO_ID = process.env.MONGO_ID; 

export const INFURA_KEY = process.env.INFURA_KEY; 

export const ETH_NET_NAME = process.env.ETH_NET_NAME; 

export const ETH_RPC_URL = process.env.ETH_RPC_URL;

export const ETH_CONFIRMATION_NEEDED = process.env.CONFIRMATION_NEEDED || 1;

export const PUBLIC_KEY = process.env.PUBLIC_KEY;

export const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const CONFIRMATION_NEEDED = process.env.CONFIRMATION_NEEDED;

export const HEROKU_API_TOKEN = process.env.HEROKU_API_TOKEN;

export const HEROKU_API_BEARER_TOKEN = process.env.HEROKU_API_BEARER_TOKEN;

export const MS_WITHDRAW_URL = process.env.MS_WITHDRAW_URL;

export const MS_MASTER_URL = process.env.MS_MASTER_URL;

export const IS_DEVELOPMENT = ENV == 'production' ? false : true; 

export const FRONTEND_BRANCH = !IS_DEVELOPMENT ? 'master' : 'dev';

export const GITHUB_LAYOUT_REPO = process.env.GITHUB_LAYOUT_REPO;

export const BITGO_ACCESS_TOKEN = process.env.BITGO_KEY;

export const BITGO_ENTERPRISE_ID = process.env.BITGO_ENTERPRISE_ID;

export const QUOTA_GUARD_URL = process.env.QUOTA_GUARD_URL;

export const SENDINBLUE_EMAIL_TO = process.env.SENDINBLUE_EMAIL_TO;

export const SENDINBLUE_API_KEY = process.env.SENDINBLUE_API_KEY;

export const PUSHER_APP_ID = process.env.PUSHER_APP_ID;

export const PUSHER_APP_KEY = process.env.PUSHER_APP_KEY;

export const PUSHER_APP_SECRET = process.env.PUSHER_APP_SECRET;

/* Later to be change with route to change price */
export const PRICE_VIRTUAL_CURRENCY_GLOBAL = 0.001;

/* Variables */

var ETH_NETWORK = config.eth;

var DB_MONGO = config.mongo;

/**
 * @function SET_ENV
 */


DB_MONGO = {
    "connection_string" : process.env.MONGO_URL,
    "dbs" : {
        "main" : process.env.MONGO_MAIN,
        "ecosystem" : process.env.MONGO_ECOSYSTEM,
        "redis" : process.env.MONGO_REDIS
    }
};

if(ETH_RPC_URL){
    ETH_NETWORK = ETH_RPC_URL
}else{
    ETH_NETWORK = changeAllStringsInObjectRecursive(ETH_NETWORK, 'ETH_NET_NAME', ETH_NET_NAME);
    ETH_NETWORK = changeAllStringsInObjectRecursive(ETH_NETWORK, 'INFURA_KEY', INFURA_KEY);
}

export {
    ETH_NETWORK,
    DB_MONGO
}