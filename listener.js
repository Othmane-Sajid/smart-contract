const helpers = require("./helpers.js");


const metamask = document.getElementById("connectButton");
const deposit = document.getElementById("depositButton");
const withDraw = document.getElementById("withdrawButton");
const accountBalance = document.getElementById("getAccountBalanceButton");
const totalBalanceInContract = document.getElementById("getTotalBalanceInContract");
const budgetOfContract = document.getElementById("getBudgetOfContract");
const depositSection = document.getElementById("depositSection");
const depositDropDown = document.getElementById("depositDropDown");
const rulesSection = document.getElementById("rulesSection");
const rulesDropDown = document.getElementById("rulesDropDown");
const gameSection = document.getElementById("gameSection");
const gameDropDown = document.getElementById("gameDropDown");
const accountSection = document.getElementById("accountSection");


accountSection.addEventListener('click', function handleClick(){
    let element = document.getElementById("infosOnAccount");
    if(element.style.display == "block"){
        element.style.display = "none";
    }else{
        element.style.display = "block";
    }
});


gameSection.addEventListener('click', function handleClick(){
    let element = document.getElementById("play-game");
    if(element.style.display == "block"){
        element.style.display = "none";
    }else{
        element.style.display = "block";
    }
});


gameDropDown.addEventListener('click', function handleClick(){
    let element = document.getElementById("play-game");
    if(element.style.display == "block"){
        element.style.display = "none";
    }else{
        element.style.display = "block";
    }
});

rulesSection.addEventListener('click', function handleClick(){
    let element = document.getElementById("rules");
    if(element.style.display == "block"){
        element.style.display = "none";
    }else{
        element.style.display = "block";
    }
});

rulesDropDown.addEventListener('click', function handleClick(){
    let element = document.getElementById("rules");
    if(element.style.display == "block"){
        element.style.display = "none";
    }else{
        element.style.display = "block";
    }
});


depositSection.addEventListener('click', function handleClick(){
    let element = document.getElementById("deposit-withdraw");
    if(element.style.display == "block"){
        element.style.display = "none";
    }else{
        element.style.display = "block";
    }
});

depositDropDown.addEventListener('click', function handleClick(){
    let element = document.getElementById("deposit-withdraw");
    if(element.style.display == "block"){
        element.style.display = "none";
    }else{
        element.style.display = "block";
    }
});

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
        document.getElementById("loaderWaitingConfirmation").style.display = "block";
        helpers.deposit();
    }catch(err){
        document.getElementById("loaderWaitingConfirmation").style.display = "none";
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