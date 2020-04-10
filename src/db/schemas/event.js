import {globals} from "../../Globals";
let db = globals.main_db;

class EventSchema{};

EventSchema.prototype.name = 'Event';

EventSchema.prototype.schema = {
}

EventSchema.prototype.model = db.model(EventSchema.prototype.name, new db.Schema(EventSchema.prototype.schema));
       
export {
    EventSchema
}
