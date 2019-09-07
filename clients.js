const express=require("express");
const methodes=require("./methode");

const client=express.Router();
client.post("/paiement",(req,res)=>{
    let param=JSON.parse(req.body.param);
    methodes.getToken(param).then(rep=>{
        res.send(rep);
    })
});

module.exports=client;