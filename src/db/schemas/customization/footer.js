import { globals } from "../../../Globals";
import mongoose from 'mongoose';

let db = globals.main_db;

class FooterSchema{};

FooterSchema.prototype.name = 'Footer';

FooterSchema.prototype.schema =  {
    supportLinks    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link'}], 
    communityLinks  : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link'}]
}


FooterSchema.prototype.model = db.model(FooterSchema.prototype.name, new db.Schema(FooterSchema.prototype.schema));
      
export {
    FooterSchema
}
