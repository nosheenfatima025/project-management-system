import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  description:{type:String,default:''},
  category:{type:String,default:'Development'},
  status:{type:String,enum:['Active','Completed','On Hold'],default:'Active'},
  progress:{type:Number,min:0,max:100,default:0},
  dueDate:{type:Date},
  members:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
  owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
},{timestamps:true});
export default mongoose.model('Project',projectSchema);
