import { globals } from "../../../Globals";
let db = globals.main_db;

class TopBarSchema{};

TopBarSchema.prototype.name = 'TopBar';

TopBarSchema.prototype.schema =  {
    text                 : { type : String},
    backgroundColor       : { type : String},
    textColor             : { type : String},
    isActive              : { type : Boolean, default : false},
}


TopBarSchema.prototype.model = db.model(TopBarSchema.prototype.name, new db.Schema(TopBarSchema.prototype.schema));
      
export {
    TopBarSchema
}
