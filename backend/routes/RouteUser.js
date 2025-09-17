const express=require('express');
const {doSignup}=require("../controllers/ControllerUser"); //importing signup controller

const app=express.Router();

app.post('/do-signup',doSignup);

module.exports=app;