import { globals } from "../../../Globals";
let db = globals.main_db;

class LinkSchema{};

LinkSchema.prototype.name = 'Link';

LinkSchema.prototype.schema =  {
    href : { type : String },
    name  : { type : String }
}


LinkSchema.prototype.model = db.model(LinkSchema.prototype.name, new db.Schema(LinkSchema.prototype.schema));
      
export {
    LinkSchema
}
