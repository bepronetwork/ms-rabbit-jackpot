import {globals} from "../../Globals";
import mongoose from 'mongoose';
let db = globals.main_db;

class CustomizationSchema{};

CustomizationSchema.prototype.name = 'Customization';

CustomizationSchema.prototype.schema =  {
    topBar      : { type : mongoose.Schema.Types.ObjectId, ref: 'TopBar', required : true },
    banners     : { type : mongoose.Schema.Types.ObjectId, ref: 'Banners', required : true },
    logo        : { type : mongoose.Schema.Types.ObjectId, ref: 'Logo', required : true },
    colors      : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Color', required : true }],
    footer      : { type : mongoose.Schema.Types.ObjectId, ref: 'Footer', required : true },
    topIcon     : { type : mongoose.Schema.Types.ObjectId, ref: 'TopIcon', required : true },
    loadingGif  : { type : mongoose.Schema.Types.ObjectId, ref: 'LoadingGif', required : true },
}


CustomizationSchema.prototype.model = db.model(CustomizationSchema.prototype.name, new db.Schema(CustomizationSchema.prototype.schema));
      
export {
    CustomizationSchema
}
