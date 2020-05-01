import { globals } from "../../../Globals";
let db = globals.main_db;

class LoadingGifSchema{};

LoadingGifSchema.prototype.name = 'LoadingGif';

LoadingGifSchema.prototype.schema =  {
    id : { type : String }
}


LoadingGifSchema.prototype.model = db.model(LoadingGifSchema.prototype.name, new db.Schema(LoadingGifSchema.prototype.schema));

export {
    LoadingGifSchema
}