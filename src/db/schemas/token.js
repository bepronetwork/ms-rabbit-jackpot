import { globals } from "../../Globals";
let db = globals.main_db;
import mongoose from 'mongoose';

class TokenSchema{};

TokenSchema.prototype.name = 'Token';

TokenSchema.prototype.schema = {
    token   : { type : String, required : true },
    user    : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : false },
    admin   : { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required : false }
};

TokenSchema.prototype.model = db.model('Token', new db.Schema(TokenSchema.prototype.schema));

export {
    TokenSchema
}


