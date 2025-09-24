const jwt = require('jsonwebtoken');

const jwtAuthWithNext=(req,resp,next)=>{

    const full_token = req.headers['authorization'];  
    console.log(full_token);

    var ary=full_token.split(" ");             
    let actualToken=ary[1];
    console.log('*****************************************')
    console.log(actualToken);

    //Try catch is only used when you expect an exception to occur and need to handle it in a specified way
    let isTokenValid;                                                                
    try{
        isTokenValid = jwt.verify(actualToken,process.env.SEC_KEY);
    }
    catch(err)                                                     
    {
        resp.json({status:false,message:"Unauthorized User"});            //this message will only be executed if token gets expired/invalidated
        return;
    }
    if(isTokenValid){

        console.log("********************************************");
        const obj = jwt.decode(ary[1]);
        console.log(obj);
        req.query.item=obj.result.emailid;
        next();                                                          //If token gets validated, control will go to fetchOneProfile API(i.e. next middleware fxn) using next()                           
    }
}
module.exports=jwtAuthWithNext;