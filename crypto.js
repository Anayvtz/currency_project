

import { createWindow } from './utils.js';

let cryptoIdTbl = [];

async function getCryptoSymbols() {
    let response = await fetch("https://api.coinlore.net/api/tickers/");
    let data = await response.json();
    console.log(data);
    let symbols = data.data.map((item) => item.symbol);
    console.log(symbols);
    symbols.forEach((item, index) => cryptoIdTbl[item] = data.data[index].id);
    let coinsNum = data.info.coins_num;
    console.log(coinsNum);
    let start = 100;
    let maxAmount = 1000;
    let limit = coinsNum - maxAmount;
    for (let i = coinsNum; i > limit; i -= 100, start += 100) {
        try {
            let nextAmount = (i < 200 ? i - 100 : 100);
            console.log(nextAmount);
            let resp = await fetch(`https://api.coinlore.net/api/tickers/?start=${start}&limit=${nextAmount}`);
            let respData = await resp.json();
            let currSymbolsArr = respData.data.map(item => item.symbol);
            currSymbolsArr.forEach((item, index) => cryptoIdTbl[item] = data.data[index].id);
            // console.log(currSymbolsArr);
            symbols = [...symbols, ...currSymbolsArr];
            console.log("while " + symbols);
        } catch (err) {
            console.log(err);
        }
    }
    console.log("symbols is:" + symbols);
    console.log(cryptoIdTbl);
    return symbols;
}

async function populateCryptoSymbols() {
    let symbolsArr = await getCryptoSymbols();
    let cryptoCoins = document.getElementById("cryptoCoins");
    symbolsArr.forEach(symbol => {
        let newOption = `<option value="${symbol}">${symbol}</option>`;
        cryptoCoins.innerHTML += newOption;
    });
}
populateCryptoSymbols();

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