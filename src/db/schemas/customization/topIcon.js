import { globals } from "../../../Globals";
let db = globals.main_db;

class TopIconSchema{};

TopIconSchema.prototype.name = 'TopIcon';

TopIconSchema.prototype.schema =  {
    id : { type : String }
}


TopIconSchema.prototype.model = db.model(TopIconSchema.prototype.name, new db.Schema(TopIconSchema.prototype.schema));
      
export {
    TopIconSchema
}
