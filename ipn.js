const express=require("express");
const data=require("./data");
const model=require("./model");

const route=express.Router();

function SHA256Encrypt(password) {
    let crypto = require('crypto');
    let sha256 = crypto.createHash('sha256');
    sha256.update(password);
    return sha256.digest('hex');
}
route.post("/notification",(req,res)=>{
    console.log("ipn");
    let type_event = req.body.type_event;
    let custom_field = JSON.parse(req.body.custom_field);
    let ref_command = req.body.ref_command;
    let item_name = req.body.item_name;
    let item_price = req.body.item_price;
    let devise = req.body.devise;
    let command_name = req.body.command_name;
    let env = req.body.env;
    let payment_method=req.body.payment_method;
    let token = req.body.token;
    let api_key_sha256 = req.body.api_key_sha256;
    let api_secret_sha256 = req.body.api_secret_sha256;
    let my_api_key = data.API_KEY;
    let my_api_secret = data.API_SECRET;
    if(SHA256Encrypt(my_api_secret) === api_secret_sha256 && SHA256Encrypt(my_api_key) === api_key_sha256)
        {
            //from PayExpresse
            model.finaliserPaiement(type_event,payment_method,ref_command);
            res.send({success:1})
        }
        else{
            //not from PayExpresse
            res.send({success:0})
        }
   // res.send("ipn")
});
/*
route.get("/",(req,res)=>{
    model.finaliserPaiement('sale_complete',"wari","walMSUy2qo");
    res.send("test ")
});
*/
module.exports=route;