const helpers = require("./helpers.js");


const metamask = document.getElementById("connectButton");
const deposit = document.getElementById("depositButton");
const withDraw = document.getElementById("withdrawButton");
const accountBalance = document.getElementById("getAccountBalanceButton");
const totalBalanceInContract = document.getElementById("getTotalBalanceInContract");
const budgetOfContract = document.getElementById("getBudgetOfContract");
const startGameButton = document.getElementById("startGameButton");


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
        $('#cover-spin').show(0);
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

startGameButton.addEventListener('click', function handleClick() {
    try{
        helpers.startGameInit();
    }catch(err){
        console.log(err);
    }
});



// DEV ONLY

// const fundContract = document.getElementById("fundContractButton");
// const selfDestruct = document.getElementById("selfDestructButton");

// fundContract.addEventListener('click', function handleClick() {
//     try{
//          helpers.fundProprietaryBudgetOfContract();
//     }catch(err){
//          console.log(err);
//      }
//  }); 

// selfDestruct.addEventListener('click', function handleClick() {
//   try{
//       helpers.selfDestruct();
//   }catch(err){
//       console.log(err);
//   }
// });