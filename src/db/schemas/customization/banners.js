import { globals } from "../../../Globals";
let db = globals.main_db;

class BannersSchema{};

BannersSchema.prototype.name = 'Banners';

BannersSchema.prototype.schema =  {
    ids                     : [{
        image_url   : {type : String},
        link_url    : {type : String},
        button_text : {type : String},
        title       : {type : String},
        subtitle    : {type : String}
    }],
    autoDisplay : { type : Boolean, default : false}
}


BannersSchema.prototype.model = db.model(BannersSchema.prototype.name, new db.Schema(BannersSchema.prototype.schema));
export {
    BannersSchema
}
