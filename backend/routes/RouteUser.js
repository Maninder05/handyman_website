const express=require('express');
const {doSignup}=require("../controllers/ControllerUser");

const app=express.Router();

app.post('/do-signup',doSignup);

module.exports=app;