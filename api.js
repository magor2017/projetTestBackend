const express=require("express");
const model=require("./model");

let api=express.Router();

api.post("/paiement",(req,res)=>{
    let body=req.body.param;
    let bodyjson=JSON.parse(body);
    console.log(bodyjson);
    model.finaliserPaiement('sale_complete','om',bodyjson.ref);
    model.detail(bodyjson.ref,bodyjson.tel,bodyjson.code);
    res.send({success:1});
});
module.exports=api;