const mongoose=require("mongoose");

    let Signup=new mongoose.Schema(                                     
        { 
            emailid:{type:String,required:true,unique:true,index:true},
            pwd:String,
            type:String, 
        },
        {
            versionKey: false,                                          
        }
    )
const SignupModel=mongoose.model("UsersCollection",Signup) 

module.exports=SignupModel;