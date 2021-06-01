

const express = require('express');
const helmet = require("helmet");


const app = express();

app.use(helmet());

const server = app.listen(8080, () =>{
    console.log()
});



app.get('/api/binance/price', async (req, res) => {
    res.send(sJson);

});

app.get('/api/upbit/price', async (req, res) => {
    res.send(sJson);

});

var price_list = ''
var sJson = '';
var uJson = '';
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'AsuW8pjiAx6XVWsKGxTnscWS6xfaeJa97KOSGY3CHbw8MTml5E2V0jk5EhpoBLC3',
  APISECRET: 'k9xip6mFjadZWHcrpyqCe7vYW9HTCCtbUSCTE7WZZJSo43KqFiAD5El26y6ERSqK'
});


const fetch = require('node-fetch');



  
const timer=ms => new Promise(res=>setTimeout(res, ms))


async function load() {
    while(true){
        binance.prices(['BNBBTC' ,'ETHBTC'], (error, ticker) => {
            
            

            var aJsonArray = new Array();

            var aJson = new Object(); 
            aJson.symbol = "BTCUSDT";
            aJson.price = ticker.BTCUSDT;
            aJsonArray.push(aJson);

            var aJson = new Object(); 
            aJson.symbol = "ETHUSDT";
            aJson.price = ticker.ETHUSDT;
            aJsonArray.push(aJson);

            var aJson = new Object(); 
            aJson.symbol = "ADAUSDT";
            aJson.price = ticker.ADAUSDT;
            aJsonArray.push(aJson);

            var aJson = new Object(); 
            aJson.symbol = "XRPUSDT";
            aJson.price = ticker.XRPUSDT;
            aJsonArray.push(aJson);

            var aJson = new Object(); 
            aJson.symbol = "DOGEUSDT";
            aJson.price = ticker.DOGEUSDT;
            aJsonArray.push(aJson);

            var aJson = new Object(); 
            aJson.symbol = "DOTUSDT";
            aJson.price = ticker.DOTUSDT;
            aJsonArray.push(aJson);

            var aJson = new Object(); 
            aJson.symbol = "LTCUSDT";
            aJson.price = ticker.LTCUSDT;
            aJsonArray.push(aJson);

            var aJson = new Object(); 
            aJson.symbol = "VETUSDT";
            aJson.price = ticker.VETUSDT;
            aJsonArray.push(aJson);

            var aJson = new Object(); 
            aJson.symbol = "EOSUSDT";
            aJson.price = ticker.EOSUSDT;
            aJsonArray.push(aJson);
            
            sJson = JSON.stringify(aJsonArray);

            console.info(sJson);

          });


          const url = 'https://api.upbit.com/v1/ticker?markets=KRW-BTC, KRW-ETH, KRW-ADA, KRW-XRP, KRW-DOGE, KRW-DOT, KRW-LTC, KRW-VET, KRW-EOS';
          const options = {method: 'GET', headers: {Accept: 'application/json'}};
          var bJson = ''; 
          await fetch(url, options)
            .then(res => res.json())
            .then(json => {
                bJson = JSON.stringify(json)})
            .catch(err => console.error('error:' + err));
            
            var uJsonArray = new Array();
            for( var i = 0; i< bJson.length; i++ ) {


            }
            aJson.symbol = bJson[i].market;
            aJson.price = ticker.BTCUSDT;
            uJsonArray.push(aJson);
            
          console.log(bJson);
        await timer(500);

        
    }
}

load();



var mysql      = require('mysql');
const ms = require('ms');
const { json } = require('express');
const { array } = require('assert-plus');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : 'iwnbhaf1217',
  database : 'binance'
});
 
connection.connect();
 
connection.query('SELECT binance_price FROM binance_price WHERE id=1', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();