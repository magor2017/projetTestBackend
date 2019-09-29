const fetch=require("node-fetch");
const model=require("./model");
const data=require("./data");

forfaits=[
    {
        item_name:"farfait 1 mois",
        item_price:"1000",
        id:1
    },
    {
        item_name:"forfait 6 mois",
        item_price:"3000",
        id:2
    },
    {
        item_name:"forfait 12 mois",
        item_price:"6000",
        id:3
    }
]
function getReferenceCommande(){
    let ref="";
    for(let i=0;i<10;i++){
        ref+=getChar();
    }
    return ref;
}

function getForfait(id){
    let p=forfaits.filter((el)=>el.id===id);
    return p.length===0?{}:p[0];
}
function getChar(){
    let tab="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let l=tab.length;
    let i=Math.floor(Math.random()*l);
    return tab[i];
}
async function getToken(param){
    let id=parseInt(param.forfait);
    let f=getForfait(id);
    let ref_command=getReferenceCommande();
    if(f!=={}){
            let params = {
                item_name:f.item_name,
                item_price:f.item_price,
                currency:"XOF",
                ref_command:ref_command,
                command_name:"Paiement forfait",
                env:"test",
                ipn_url:"https://97cdc06b.ngrok.io/ipn/notification",
                success_url:"https://domaine.com/success",
                cancel_url:"https://domaine.com/cancel",
                custom_field:JSON.stringify({
                custom_fiel1:"value_1",
                custom_fiel2:"value_2",
            })
                };
            let headers = {
                Accept: "application/json",
                'Content-Type': "application/json",
                API_KEY:data.API_KEY,
                API_SECRET:data.API_SECRET,
            };
            let t=await token(params,headers); 
            //console.log(t);
            //let r=t.then(json=>json);
            switch(t.success){
                case -1:{
                    console.log(t)
                    return t;
                }
                case 1:{
                    f.ref_command=ref_command;
                    f.token=t.token;
                    f.item_id=id;
                    f.tel=param.tel;
                    try{
                        model.insertPaiement(f);
                        return await paiement(id,f);
                    }catch(error){
                        return {success:-1};

                    }
                }
            }
    }

}
//methode de recuperation du token
function token(params,headers){
    let paymentRequestUrl = "https://payexpresse.com/api/payment/request-payment";
    //let reponse=undefined;
    return fetch(paymentRequestUrl,{
        method:"POST",
        body:JSON.stringify(params),
        headers:headers
    }).then(rep=>{
           // console.log(rep)
            switch(rep.status){
                case 500:{
                    return new Promise((resolve,reject)=>{
                        resolve({success:500,message:"server error"})
                    })
                }
                case 404:{
                    return new Promise((resolve,reject)=>{
                        resolve({success:404,message:"server not found"})
                    })
                }
                default:{
                    return rep.json();
                }
            }
        })
        .then(json=>{
           return json;    
    });
    
}
//methode pour demander un paiement
function paiement(id,f){
    let r=undefined;
    return fetch('https://sample.payexpresse.com/paiement.php',{
            method:"post",
            body:"item_id="+id,
            headers:{
                "Accept":"text/html",
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>{
           // return {rep:rep.json(),f:f}
            return rep.json().then(json=>{
                return new Promise((resolve,reject)=>{
                    resolve({rep:json,f:f})
                });
            });
        });
}

module.exports.getToken=getToken;