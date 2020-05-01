import {globals} from "../../Globals";
let db = globals.main_db;

class LogSchema{};

LogSchema.prototype.name = 'Log';

LogSchema.prototype.schema = {
    ip          : {type: String, required : true},
    countryCode : {type: String, required : true},
    route       : {type: String, required : false},
    process     : {type : String, required : false},
    creatorId   : {type : String, required : false},
    creatorType : {type : String, required : false}
}

LogSchema.prototype.model = db.model(LogSchema.prototype.name, new db.Schema(LogSchema.prototype.schema, { timestamps: true }));

export {
    LogSchema
}
