const helpers = require("./helpers.js");


const metamask = document.getElementById("connectButton");
const deposit = document.getElementById("depositButton");
const withDraw = document.getElementById("withdrawButton");
const accountBalance = document.getElementById("getAccountBalanceButton");
const totalBalanceInContract = document.getElementById("getTotalBalanceInContract");
const budgetOfContract = document.getElementById("getBudgetOfContract");
const fundContract = document.getElementById("fundContractButton");
const selfDestruct = document.getElementById("selfDestructButton");



budgetOfContract.addEventListener('click', function handleClick() {
    try{
        helpers.getCurrentBudgetOfContract();
    }catch(err){
        console.log(err);
    }
    
});

totalBalanceInContract.addEventListener('click', function handleClick() {
    try{
        helpers.getBalanceInContract();
    }catch(err){
        console.log(err);
    }
    
});

accountBalance.addEventListener('click', function handleClick() {
    try{
        helpers.getBalance();
    }catch(err){
        console.log(err);
    }
    
});

withDraw.addEventListener('click', function handleClick() {
    try{
        helpers.withdraw();
    }catch(err){
        console.log(err);
    }
    
});

deposit.addEventListener('click', function handleClick() {
    try{
        helpers.deposit();
    }catch(err){
        console.log(err);
    }
    
});

metamask.addEventListener('click', function handleClick() {
    try{
        helpers.connect();
    }catch(err){
        console.log(err);
    }
    
});

fundContract.addEventListener('click', function handleClick() {
    try{
        helpers.fundProprietaryBudgetOfContract();
    }catch(err){
        console.log(err);
    }
});

selfDestruct.addEventListener('click', function handleClick() {
  try{
      helpers.selfDestruct();
  }catch(err){
      console.log(err);
  }
});