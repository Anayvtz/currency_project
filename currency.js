
import { createWindow } from './utils.js';

populateSelectors();
document.getElementById("convert").addEventListener("click", () => {
    let amount = getAmount();
    let from = getFrom();
    let to = getTo();
    getConversion(from, to, amount).then(data => {
        print(data.conversion_result + " " + to);
    }).catch(err =>
        console.error(err)
    )
});
document.getElementById("rates").addEventListener("click", exchangeRates);

async function populateSelectors() {
    let response = await fetch("https://v6.exchangerate-api.com/v6/123bfaff5033b4351e1ca917/codes");
    let data = await response.json();
    console.log(data);
    let codes = data.supported_codes.map((item) => item[0]);
    let fromSelector = document.getElementById("from-currency");
    let toSelector = document.getElementById("to-currency");
    let coins = document.getElementById("coins");
    codes.forEach((code) => {
        let newOption = `<option value="${code}">${code}</option>`;
        fromSelector.innerHTML += newOption;
        toSelector.innerHTML += newOption;
        coins.innerHTML += newOption;
    });
}
function getAmount() {
    let amount = document.getElementById("amount");
    console.log(amount.value);
    return amount.value;
}
function getFrom() {
    let from = document.getElementById("from-currency");
    console.log(from.value);
    return from.value;
}
function getTo() {
    let to = document.getElementById("to-currency");
    console.log(to.value);
    return to.value;
}

async function getConversion(from, to, amount) {
    let response = await fetch(`https://v6.exchangerate-api.com/v6/123bfaff5033b4351e1ca917/pair/${from}/${to}/${amount}`);
    let data = await response.json();
    console.log(data);
    return data;
}
function print(amountCnvrtd) {
    let result = document.getElementById("result");
    console.log(amountCnvrtd);
    result.innerHTML = amountCnvrtd;
}

async function exchangeRates() {
    let coin = document.getElementById("coins").value;
    let exchangeRatesArr = await getExchangeRates(coin);
    let tableHTML = prepareTblHTML(exchangeRatesArr, coin);
    createWindow(tableHTML);
}
function prepareTblHTML(exchangeRatesArr, coin) {
    let tableHTML = `<h1>exchange rates of ${coin}</h1><table border="1"><thead><><th>Coin</th><th>rate</th></thead><tbody>`;
    exchangeRatesArr.forEach(item => {
        tableHTML += `<tr><td>${item[0]}</td><td>${item[1]}</td></tr>`;

    });
    tableHTML += '</tbody></table>';
    return tableHTML;
}

async function getExchangeRates(coin) {
    let response = await fetch("https://v6.exchangerate-api.com/v6/123bfaff5033b4351e1ca917/latest/" + coin);
    let data = await response.json();
    let coinsArr = Object.keys(data.conversion_rates);
    let ratesArr = Object.values(data.conversion_rates);
    let exchangeRatesArr = coinsArr.map((key, index) => [key, ratesArr[index]]);
    return exchangeRatesArr;
}