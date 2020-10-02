const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  city:{type:String},
  country:{type:String},
  weather_icons:{type:Array},
  temperature:{type:String},
  description:{type:String},
  wind_speed:{type:String},
  wind_direction:{type:String},
  wind_degree:{type:String},
  pressure:{type:String},
  precipitation:{type:String},
  humidity:{type:String},
  cloudcover:{type:String},
  feelslike:{type:String},
  uv_index:{type:String},
  visibility:{type:String}, 
  user:{
    type: mongoose.Types.ObjectId, 
    required: true,
    ref: 'User'
  },       
},
  {
    timestamps:true
  }
);

HistorySchema.set("toJSON",{
  transform:(document,returnObject)=>{
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject._v
  }
})

const History=mongoose.model('History',HistorySchema);
module.exports=History;
