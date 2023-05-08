var express = require('express');
var axios = require('axios');
var app = express();

app.use('/', express.static('public'));

app.get("/api/monster/:monsterId", ((req, res, next) => {
  axios.get(`https://www.divine-pride.net/api/database/Monster/${req.params.monsterId}?apiKey=9025bab7769c8dda748c39b12d594631`).then((data)=>{
    res.json(data.data);
  });
}));

app.get("/api/item/:itemId", ((req, res, next) => {
  axios.get(`https://www.divine-pride.net/api/database/Item/${req.params.itemId}?apiKey=9025bab7769c8dda748c39b12d594631&server=bRO`).then((data)=>{
    res.json(data.data);
  });
}));

app.listen(process.env.PORT || 3000);
