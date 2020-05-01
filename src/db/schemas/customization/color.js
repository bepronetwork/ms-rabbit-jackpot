import { globals } from "../../../Globals";
let db = globals.main_db;

class ColorSchema{};

ColorSchema.prototype.name = 'Color';

ColorSchema.prototype.schema =  {
    type : { type : String },
    hex  : { type : String }
}


ColorSchema.prototype.model = db.model(ColorSchema.prototype.name, new db.Schema(ColorSchema.prototype.schema));
      
export {
    ColorSchema
}
