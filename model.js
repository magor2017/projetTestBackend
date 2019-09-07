const mysql=require("mysql");
const fs=require("fs");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projettest'
  });
  
  function insertPaiement(f){
    connection.query("INSERT INTO paiement(client_phone,payment_methode,item_name,item_id,item_price,ref_commande,currency,token) VALUES(?,'',?,?,?,?,'XOF',?)",[f.tel,f.item_name,f.item_id,f.item_price,f.ref_command,f.token],(err,res)=>{
        if(err){
            console.log(err);
        }
    });
  }
  function finaliserPaiement(type_event,payment_methode,ref_commande){
    let etat=0;
    let pm="";
    if(type_event==='sale_complete'){
        etat=1;
        pm=payment_methode;
    }
    if(type_event==='sale_canceled'){
        etat=-1;
    }
    connection.query("UPDATE paiement SET etat=?,payment_methode=? WHERE ref_commande=?",[etat,pm,ref_commande],(err)=>{
        if(err){
            console.log("error");
            fs.writeFile("./files/"+ref_commande+".txt",etat+"/"+pm,(err,fd)=>{
                if(err){}
            });
        }
    })
  }
  
  module.exports.insertPaiement=insertPaiement;
  module.exports.finaliserPaiement=finaliserPaiement;
  