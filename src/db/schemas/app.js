import {globals} from "../../Globals";
import mongoose from 'mongoose';
let db = globals.main_db;

class AppSchema{};

AppSchema.prototype.name = 'App';

AppSchema.prototype.schema =  {
    name                : {  type: String, required : true},
    description         : {  type: String, required : true},
    isValid             : {  type: Boolean, required : true, default : false},
    games               : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
    listAdmins          : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required : true}],
    services            : [{type: Number}],
    whitelistedAddresses: [{
        currency            : { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
        addresses           : [{ type: String, required : true, default : 'N/A' }]
    }],
    currencies          : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Currency'}],
    users               : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    external_users      : [{type: String}],
    wallet              : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet'}],
    deposits            : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deposit'}],
    withdraws           : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Withdraw'}],
    affiliateSetup      : { type: mongoose.Schema.Types.ObjectId, ref: 'AffiliateSetup'},
    integrations        : { type: mongoose.Schema.Types.ObjectId, ref: 'Integrations'},
    customization       : { type: mongoose.Schema.Types.ObjectId, ref: 'Customization'},
    typography          : { type: mongoose.Schema.Types.ObjectId, ref: 'Typography'},
    countriesAvailable  : [{ type: Number}],
    licensesId          : [{ type: String}],
    metadataJSON        : {  type: JSON},
    isWithdrawing       : { type : Boolean, default : false, required : true },
    hosting_id          : { type : String },
    web_url             : { type : String },
    addOn               : { type: mongoose.Schema.Types.ObjectId, ref: 'AddOn'},
    virtual             : { type : Boolean, default : false, required : true },
}


AppSchema.prototype.model = db.model(AppSchema.prototype.name, new db.Schema(AppSchema.prototype.schema));
      
export {
    AppSchema
}
