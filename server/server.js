const express = require("express");
const cors = require('cors');
const fs =require('fs');
var bodyParser = require('body-parser');

// App
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/getAllProducts", (req, res) => {
  let rawdata = fs.readFileSync('data/products.json');
  let products = JSON.parse(rawdata);
  res.status(200).send({data: products});
});
app.get("/getAllSuppliers", (req, res) => {
  let rawdata = fs.readFileSync('data/suppliers.json');
  let suppliers = JSON.parse(rawdata);
  res.status(200).send({data: suppliers});
});
app.post("/addNewProduct", (req, res) => {
  let rawdata = fs.readFileSync('data/products.json');
  let products = JSON.parse(rawdata);
  products['products'].push(req.body);
  products = JSON.stringify(products);
  fs.writeFileSync('data/products.json', products);
  res.status(200).send({data: req.body});
})
app.put("/updateExistingProduct", (req, res) => {
  let rawdata = fs.readFileSync('data/products.json');
  let products = JSON.parse(rawdata);
  products['products'].forEach(element => {
    if(element['code']==req.body['code'])
    {
      element['price']=req.body['price'];
      element['amount']=req.body['amount'];
      element['supplierCode']=req.body['supplierCode'];
    }
  });
  products = JSON.stringify(products);
  fs.writeFileSync('data/products.json', products);
  res.status(200).send({data: req.body});
})
app.listen(3000);