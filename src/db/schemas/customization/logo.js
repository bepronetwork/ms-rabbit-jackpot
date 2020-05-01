import { globals } from "../../../Globals";
let db = globals.main_db;

class LogoSchema{};

LogoSchema.prototype.name = 'Logo';

LogoSchema.prototype.schema =  {
    id : { type : String }
}


LogoSchema.prototype.model = db.model(LogoSchema.prototype.name, new db.Schema(LogoSchema.prototype.schema));
      
export {
    LogoSchema
}
