

import { createWindow } from './utils.js';

let cryptoIdTbl = [];
let cryptoNameTbl = [];
let cryptoPriceUsdTbl = [];
let cryptoPriceBtcTbl = [];


populateCryptoSymbols();
populateCryptoPrices();

let icons = [];
icons["BTC"] = "./images/icons8-bitcoin-logo.svg";
icons["ETH"] = "./images/icons8-ethereum-logo.svg";
icons["USDT"] = "./images/icons8-tether.svg";
icons["BNB"] = "./images/icons8-binance.svg";
icons["SOL"] = "./images/Solana-Sol-Black-Logo-PNG-364x205.jpg";
icons["USDC"] = "./images/usd-coin.jpg";
icons["STETH"] = "./images/StakedEther.svg";
icons["TON"] = "./images/toncoin.jpg";
icons["XRP"] = "./images/ripple.svg";
icons["DOGE"] = "./images/whiteDogeCoin.jpg";
icons["ADA"] = "./images/icons8-cardano-64.png";
icons["TRX"] = "./images/tron-cryptocurrency.svg";
icons["AVAX"] = "./images/icons8-avalanche-50.png";
icons["SHIB"] = "./images/icons8-shiba-inu-50.png";
icons["WBTC"] = "./images/icons8-wrapped-bitcoin-64.png";
icons["LINK"] = "./images/icons8-chainlink-64.png";
icons["DOT"] = "./images/icons8-polkadot-64.png";
icons["BCH"] = "./images/icons8-bitcoin-cash-64.png";
icons["LEO"] = "./images/unus-sed-leo-icon-sign-260nw-2316439841.webp";
icons["LTC"] = "./images/icons8-litecoin-50.png";
icons["NEAR"] = "./images/icons8-near-protocol-64.png";
icons["UNI"] = "./images/icons8-uniswap-64.png";
icons["PEPE"] = "./images/pepe.png";
icons["KAS"] = "./images/Kaspa.png";
icons["ETC"] = "./images/ethereum-cryptocurrency.svg";
icons["FDUSD"] = "./images/first-digital-usd-fdusd-logo.png";
icons["WBETH"] = "./images/WrappedBeaconETH.svg";
icons["XMR"] = "./images/icons8-monero-50.png";
icons["XLM"] = "./images/icons8-stellar-64.png";
icons["RNDR"] = "./images/icons8-render-token-64.png";
icons["OKB"] = "./images/icons8-okb-64.png";
icons["ATOM"] = "./images/icons8-cosmos-64.png";
icons["APT"] = "./images/aptos.png";
icons["MNT"] = "./images/icons8-mantle-32.png";
icons["STX"] = "./images/icons8-stacks-64.png";
icons["MKR"] = "./images/icons8-maker-64.png";
icons["FIL"] = "./images/icons8-filecoin-64.png";
icons["IMX"] = "./images/icons8-immutable-x-64.png";
icons["WIF"] = "./images/dogwifhat.png";
icons["SUI"] = "./images/sui.png";
icons["GRT"] = "./images/theGraph.png";
icons["VET"] = "./images/vechain-cryptocurrency.svg";
icons["INJ"] = "./images/InjectiveProtocol.png";
icons["AR"] = "./images/icons8-arweave-64.png";
icons["BGB"] = "./images/BitgetToken.png";
icons["LDO"] = "./images/icons8-lido-dao-64.png";
icons["ONDO"] = "./images/ondo-finance-ondo-logo.png";
icons["FLOKI"] = "./images/FlokiInu.png";
icons["TAO"] = "./images/Bittensor-Titelbild-1200x1200-1.webp";
icons["OP"] = "./images/Optimism.png";
icons["THETA"] = "./images/ThetaToken.png";
icons["BONK"] = "./images/BONK.png";
icons["FTM"] = "./images/icons8-fantom-64.png";
icons["TUSD"] = "./images/icons8-trueusd-64.png";
icons["RUNE"] = "./images/icons8-thorchain-64.png";
icons["AAVE"] = "./images/icons8-aave-64.png";
icons["BRETT"] = "./images/Brett.webp";
icons["NOT"] = "./images/icons8-bitcoin.svg";
icons["MATIC"] = "./images/polygon-matic-icon-256x256-fo6o8921.png";
icons["JASMY"] = "./images/jasmy.svg";
icons["CHEEL"] = "./images/Cheelee.svg";
icons["FET"] = "./images/Fetchai.jpg";
icons["ALGO"] = "./images/icons8-algorand-64.png";
icons["MSOL"] = "./images/mSOL.png";
icons["QNT"] = "./images/icons8-quant-64.png";
icons["PENDLE"] = "./images/pendle-pendle-logo.png";
icons["ARB"] = "./images/Arbitrum.png";
icons["CORE"] = "./images/icons8-core-48.png";
icons["AKT"] = "./images/Cryptocurrency-Akash-network-Logo-Line-Graphics-15065967-1.jpg";
icons["CRO"] = "./images/crypto-com-cryptocurrency-icon-512x512-bj6qik3x.png";
icons["AGIX"] = "./images/agi-svgrepo-com.svg";

async function getCryptoSymbols() {
    let response = await fetch("https://api.coinlore.net/api/tickers/");
    let data = await response.json();
    console.log(data);
    let symbols = data.data.map((item) => item.symbol);
    console.log(symbols);
    populateCryptoTables(symbols, data);
    let coinsNum = data.info.coins_num;
    console.log(coinsNum);
    let start = 100;
    let maxAmount = 1000;
    let limit = coinsNum - maxAmount;
    for (let i = coinsNum; i > limit; i -= 100, start += 100) {
        try {
            let nextAmount = (i < 200 ? i - 100 : 100);

            let resp = await fetch(`https://api.coinlore.net/api/tickers/?start=${start}&limit=${nextAmount}`);
            let respData = await resp.json();
            let currSymbolsArr = respData.data.map(item => item.symbol);
            populateCryptoTables(currSymbolsArr, respData);

            symbols = [...symbols, ...currSymbolsArr];

        } catch (err) {
            console.log(err);
        }
    }
    console.log("symbols is:" + symbols);
    console.log(cryptoIdTbl);
    return symbols;
}

function populateCryptoTables(arr, data) {
    arr.forEach((item, index) => cryptoIdTbl[item] = data.data[index].id);
    arr.forEach((item, index) => cryptoNameTbl[item] = data.data[index].name);
    arr.forEach((item, index) => cryptoPriceUsdTbl[item] = data.data[index].price_usd);
    arr.forEach((item, index) => cryptoPriceBtcTbl[item] = data.data[index].price_btc);
}

async function populateCryptoSymbols() {
    let symbolsArr = await getCryptoSymbols();
    let cryptoCoins = document.getElementById("cryptoCoins");
    symbolsArr.forEach(symbol => {
        let newOption = `<option value="${symbol}">${symbol}</option>`;
        cryptoCoins.innerHTML += newOption;
    });
}


document.getElementById("cryptoBtn").addEventListener("click", () => {
    let cryptoCoins = document.getElementById("cryptoCoins").value;
    getCryptoInfo(cryptoCoins).then(response => {
        console.log(response);
        let tblHTML = prepareTblHTML(response);
        createWindow(tblHTML);
    }).catch(err => console.log(err));
});

async function getCryptoInfo(coin) {
    let response = await fetch(`https://api.coinlore.net/api/ticker/?id=${cryptoIdTbl[coin]}`);
    let data = await response.json();
    return data;

}

function prepareTblHTML(cryptoInfo) {
    let tableHTML = `<h1>crypto exchange rates of ${cryptoInfo[0].name}</h1><table border="1"><thead><><th>percent_change_1h</th><th>percent_change_24h</th><th>percent_change_7d</th></thead><tbody>`;
    tableHTML += `<tr><td>${cryptoInfo[0].percent_change_1h}</td><td>${cryptoInfo[0].percent_change_24h}</td><td>${cryptoInfo[0].percent_change_7d}</td></tr>`;
    tableHTML += '</tbody></table>';
    return tableHTML;
}

function populateCryptoPrices() {
    console.log("in populateCryptoPrices");
    getCryptoSymbols().then(response => {
        let priceTbl = document.getElementById("priceTbl");
        response.forEach(item => {
            console.log("item is:" + item);
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let img = document.createElement("img");
            img.src = icons[item];
            img.alt = "crypto icon";
            td1.appendChild(img);
            let td2 = document.createElement("td");
            td2.textContent = item;
            let td3 = document.createElement("td");
            td3.textContent = cryptoNameTbl[item];
            let td4 = document.createElement("td");
            td4.textContent = cryptoPriceUsdTbl[item];
            let td5 = document.createElement("td");
            td5.textContent = cryptoPriceBtcTbl[item];
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            priceTbl.appendChild(tr);
        })
    }).catch(err => console.log(err));

} 