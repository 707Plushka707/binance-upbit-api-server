const express = require('express');
const helmet = require("helmet");
const app = express();
app.use(helmet());
const server = app.listen(3000, () =>{
    console.log()
});
app.get('/api/binance/price', async (req, res) => {
    res.send(sJson);
});
app.get('/api/upbit/price', async (req, res) => {
    res.send(uJson);
});
app.get('/api/premium', async (req, res) => {
    res.send(premiumJson);
});

app.get('/api/notice', async (req, res) => {
    let data = {
        "notice" : "[공지사항] 실시간 api를 중간 서버에서 받아와서 1초 미만의 딜레이가 있을 수 있습니다.",
        "version" : "1.1",
        "mandatory" : true,
        "version_info" : "1.1 릴리즈 /n-코인리스트 추가 /n-안정성 개선 /n-검색기능 추가"
    };
    res.send(data);
});

var price_list = ''
var sJson = '';
var aArray = new Array();
var uJson = '';
var premiumJson = '';
var differenceJson = '';
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'AsuW8pjiAx6XVWsKGxTnscWS6xfaeJa97KOSGY3CHbw8MTml5E2V0jk5EhpoBLC3',
  APISECRET: 'k9xip6mFjadZWHcrpyqCe7vYW9HTCCtbUSCTE7WZZJSo43KqFiAD5El26y6ERSqK'
});

//환율 변경 요기서
var rate = 1110;
const fetch = require('node-fetch');
const timer=ms => new Promise(res=>setTimeout(res, ms))

fetch("https://earthquake.kr:23490/query/USDKRW")
        .then((response) => response.json())
        .then((data) => rate = data.USDKRW[0]);
        

async function loadExchangeRate() {
    while(true) {
        fetch("https://earthquake.kr:23490/query/USDKRW")
        .then((response) => response.json())
        .then((data) => rate = data.USDKRW[0]);
        console.log(rate);
        await timer(60000);
    }
}

loadExchangeRate();


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function load() {
    while(true){
        
          const url = 'https://api.upbit.com/v1/ticker?markets=KRW-BTC, KRW-ETH, KRW-ADA, KRW-XRP, KRW-DOGE, KRW-DOT, KRW-LTC, KRW-VET, KRW-EOS, KRW-LINK, KRW-CHZ, KRW-TRX, KRW-ETC, KRW-BCH, KRW-BTT, KRW-JST, KRW-NEO, KRW-STMX, KRW-THETA, KRW-TFUEL, KRW-ZIL, KRW-XTZ';
          const options = {method: 'GET', headers: {Accept: 'application/json'}};
          var bJson = ''; 
          await fetch(url, options)
            .then(res => res.json())
            .then(json => {
                bJson = json})
            .catch(err => console.error('error:' + err));
            
            var uJsonArray = new Array();
            for( var i = 0; i< bJson.length; i++ ) {
                var aJson = new Object(); 
                aJson.symbol = bJson[i]['market'];
                aJson.price = bJson[i]['trade_price'];
                uJsonArray.push(aJson);
            }

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

                var aJson = new Object(); 
                aJson.symbol = "LINKUSDT";
                aJson.price = ticker.LINKUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "CHZUSDT";
                aJson.price = ticker.CHZUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "TRXUSDT";
                aJson.price = ticker.TRXUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "ETCUSDT";
                aJson.price = ticker.ETCUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "BCHUSDT";
                aJson.price = ticker.BCHUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "BTTUSDT";
                aJson.price = ticker.BTTUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "JSTUSDT";
                aJson.price = ticker.JSTUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "NEOUSDT";
                aJson.price = ticker.NEOUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "STMXUSDT";
                aJson.price = ticker.STMXUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "THETAUSDT";
                aJson.price = ticker.THETAUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "TFUELUSDT";
                aJson.price = ticker.TFUELUSDT;
                aJsonArray.push(aJson);

                var aJson = new Object(); 
                aJson.symbol = "ZILUSDT";
                aJson.price = ticker.ZILUSDT;
                aJsonArray.push(aJson);
                var aJson = new Object(); 
                aJson.symbol = "XTZUSDT";
                aJson.price = ticker.XTZUSDT;
                aJsonArray.push(aJson);
                sJson = JSON.stringify(aJsonArray);
                aArray = aJsonArray;
    
                //console.info(sJson);
                var premiumArray = new Array();
                var differenceArray = new Array();


                for (var i = 0 ; i < uJsonArray.length ; i++){
                    var aJson = new Object(); 
                    aJson.symbol = uJsonArray[i]['symbol'];

                    if (Number.isInteger(uJsonArray[i]['price'])){
                    var u = parseInt(uJsonArray[i]['price']);
                    var b = (parseFloat(aJsonArray[i]['price']) * rate);
                    var number = (((u) / (b)) * 100) - 100;
                    aJson.premium = (Math.floor(number*100)/100).toFixed(2);
            
                    aJson.upbit =  u;
                    aJson.binance = Math.floor(b);
                    premiumArray.push(aJson);

                    } else {
                        var _pattern2 = /^\d*[.]\d{2}$/; // 현재 value값이 소수점 둘째짜리 숫자이면 더이상 입력 불가
                        var u = parseFloat(uJsonArray[i]['price']);
                        var b = (parseFloat(aJsonArray[i]['price']) * rate);
                        var number = (((u) / (b)) * 100) - 100;
                        
                        aJson.premium = (Math.floor(number*100)/100).toFixed(2);
                        if (_pattern2.test(u)) {
                        var b = (Math.floor(b*100)/100).toFixed(2);
                        var diff = u - b;
                    
                        aJson.upbit = u;
                        aJson.binance = parseFloat((Math.floor(b*100)/100).toFixed(2));
                        premiumArray.push(aJson);  
                        }  else{
                        var b = (Math.floor(b*10)/10).toFixed(1);
                        var diff = u - b;
                 
                        aJson.upbit = u;
                        aJson.binance = parseFloat( (Math.floor(b*10)/10).toFixed(1));
                        premiumArray.push(aJson);
                        }
          
                    }

                    
                }

                premiumJson = JSON.stringify(premiumArray);
    
              });           
            uJson = JSON.stringify(uJsonArray);
            console.log(premiumJson);
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