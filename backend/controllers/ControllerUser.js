const SignupModel=require("../models/ModelUser");  

function doSignup(req,resp)
{  
    const doc=new SignupModel(req.body);
    console.log(doc);
    doc.save().then((result)=>{                                                 
        resp.json({status:true,retDoc:result});                         
    }).catch((err)=>{
        resp.json({status:false,msg:"Duplicate Entry",err:err.message});
    })     
}
module.exports={doSignup}