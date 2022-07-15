const helpers = require("./helpers.js");


const metamask = document.getElementById("connectButton");
const deposit = document.getElementById("depositButton");
const withDraw = document.getElementById("withdrawButton");
const accountBalance = document.getElementById("getAccountBalanceButton");
const totalBalanceInContract = document.getElementById("getTotalBalanceInContract");
const budgetOfContract = document.getElementById("getBudgetOfContract");

budgetOfContract.addEventListener('click', function handleClick() {
    helpers.getCurrentBudgetOfContract();
});

totalBalanceInContract.addEventListener('click', function handleClick() {
    helpers.getBalanceInContract();
});

accountBalance.addEventListener('click', function handleClick() {
    helpers.getBalance();
});

withDraw.addEventListener('click', function handleClick() {
    helpers.withdraw();
});

deposit.addEventListener('click', function handleClick() {
    helpers.deposit();
});

metamask.addEventListener('click', function handleClick() {
    helpers.connect();
});