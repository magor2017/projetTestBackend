
const express=require("express");
const cors=require("cors");
const methode=require('./methode');
const bodyParser = require("body-parser");
const ipn=require("./ipn");
const client=require("./clients");

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/ipn",ipn);
app.use("/client",client);

app.listen(5000);
