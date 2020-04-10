import {globals} from "../../Globals";
import mongoose from "mongoose";
let db = globals.main_db;

class AddressSchema{};

AddressSchema.prototype.name = 'Address';

AddressSchema.prototype.schema = {
    address                     : { type: String },
    user                        : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
    currency                    : { type: mongoose.Schema.Types.ObjectId, ref: 'Currency', required : true},
    bitgo_id                    : { type: String },
}

AddressSchema.prototype.model = db.model(AddressSchema.prototype.name, new db.Schema(AddressSchema.prototype.schema));

export {
    AddressSchema
}
