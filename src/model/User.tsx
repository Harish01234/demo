import mongoose from "mongoose";
const exerciseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    }
  });
  
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    exercises: [exerciseSchema]
})

export const User=mongoose.models?.User || mongoose.model('User',userSchema);