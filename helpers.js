
const { ethers } = require("ethers");
var Web3 = require('web3');


const {contractAddress, abi} = require('./contract-info.json');


// const contractAddress = require("./contract-info.json").contractAddress;
// const abi = require("./contract-info.json").abi;
  
var account;
var isActiveSmartContractListener = false;

function manageSpinnerOff(){
  $('#cover-spin').hide(0);
}

async function addSmartContractListener() {

  if (isActiveSmartContractListener) {
    return;
  }

  isActiveSmartContractListener = true;
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(abi,contractAddress);

  window.contract.events.BalanceChange({}, (error, data) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("depot a l'adresse: " + data.returnValues[0] + " : " + data.returnValues[1]);
    
      window.playerBet = web3.utils.fromWei((data.returnValues[1] / 4).toString(), "ether");

      manageSpinnerOff();
      window.alert("Wonderfull, now go to the Game");
    }
  });

  window.contract.events.AddGainEvent({}, (error, data) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("addGain a l'adresse: " + data.returnValues[0] + " : " + data.returnValues[1]);

      manageSpinnerOff();
      document.getElementById("message-win").style.display = "block";
      document.getElementById("message-loss").style.display = "none";
      
    }
  }); 

  window.contract.events.SubstractLostEvent({}, (error, data) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("substractLost a l'adresse: " + data.returnValues[0] + " : " + data.returnValues[1]);

      manageSpinnerOff();
      document.getElementById("message-win").style.display = "none";
      document.getElementById("message-loss").style.display = "block";
      
    }
  }); 

}


async function connect() {
    if (typeof window.ethereum !== "undefined" ) {
        console.log("Metamask is present ");
        const userAccounts = await ethereum.request ({method: "eth_requestAccounts"});
        account = userAccounts[0];
        console.log("Connected to Metamask, account : " + account)
    
        var strConnect = String(account).substring(0, 5) + " ... " + String(account).substring(38);
        document.getElementById("status-metamask").innerHTML="Connected to metamask." +  "<br>" + 
                                                              `Account : ${strConnect}`;

        addSmartContractListener();
    }
}


async function withdraw() {

  try{
  
      const provider = new ethers.providers.Web3Provider(window.ethereum); 
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer); 

      await contract.withDraw();

  }catch(err){
      if (err.code !==4001) {window.alert("You need to connect your metamask account first !")} // 4001 is the code for when user rejects the tx on metamask
  }
}

async function deposit() {

  var amountToDeposit = document.getElementById("depositAmountInput").value;
  amountToDeposit = Web3.utils.toWei(amountToDeposit, 'ether'); 
 
  try{
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(abi,contractAddress);
      const userAccounts = await ethereum.request ({method: "eth_requestAccounts"});
      account = userAccounts[0];
      addSmartContractListener();
      await window.contract.methods.deposit().send({from:account, value:amountToDeposit});
  }catch(err){
    manageSpinnerOff();
  }        
}


async function getBalance() {
  try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer); 

      balanceOfUser = await contract.getBalance()
      balanceOfUser = Web3.utils.fromWei(balanceOfUser.toString(), 'ether'); 

      document.getElementById("user-balance").innerHTML=`Your balance : ${parseFloat(balanceOfUser).toFixed(4)}`;
      return balanceOfUser;
  }catch(err){
      if (err.code !==4001) {window.alert("You need to connect your metamask account first !")} // 4001 is the code for when user rejects the tx on metamask
  }
}

async function getBalanceInContract() {
  try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer); 

      totalBalanceInContract = await contract.getTotalBalanceInContract();
      totalBalanceInContract = Web3.utils.fromWei(totalBalanceInContract.toString(), 'ether'); 

      document.getElementById("total-balance").innerHTML=`Total balance in contract : ${parseFloat(totalBalanceInContract).toFixed(4)}`;
  }catch(err){
      if (err.code !==4001) {window.alert("You need to connect your metamask account first !")} // 4001 is the code for when user rejects the tx on metamask
  }    
}

async function getCurrentBudgetOfContract() {
  try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer); 

      currentBudgetOfContract = await contract.getCurrentBudgetOfContract();
      currentBudgetOfContract = Web3.utils.fromWei(currentBudgetOfContract.toString(), 'ether'); 

      document.getElementById("proprietary-budget-contract").innerHTML=`Propietary budget of the contract : ${parseFloat(currentBudgetOfContract).toFixed(4)}`;
      return currentBudgetOfContract;
  }catch(err){
      if (err.code !==4001) {window.alert("You need to connect your metamask account first !")} // 4001 is the code for when user rejects the tx on metamask
  }
}

async function selfDestruct() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer); 

    await contract.selfDestruct();
}

async function addGain(amount){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  await contract.addGain(Web3.utils.toWei(amount.toString(), 'ether'),{
    from: account
  });
  
}

async function substractLost(amount){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  
  await contract.substractLost(Web3.utils.toWei(amount.toString(), 'ether'),{
    from:account
  });
  
}

async function fundProprietaryBudgetOfContract() {
    window.web3 = await new Web3(window.ethereum)
    window.contract = await new window.web3.eth.Contract(abi,contractAddress)

    var amountToDeposit = document.getElementById("fundBudgetInput").value;
    amountToDeposit = Web3.utils.toWei(amountToDeposit, 'ether'); 
    if (amountToDeposit<= 0) {
        window.alert("The amount must be greater than 0.")
    }
    else {   
        await window.contract.methods.fundProprietaryBudgetOfContract().send({from:account, value:amountToDeposit})
      
    }
}


async function startGameInit() {

  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer); 

    balanceOfUser = await contract.getBalance()
    balanceOfUser = Web3.utils.fromWei(balanceOfUser.toString(), 'ether'); 

    document.getElementById("user-balance").innerHTML=`Your balance : ${parseFloat(balanceOfUser).toFixed(4)}`;

    if (balanceOfUser > 0 ) {
      document.getElementById("start-game").style.display = "none";
      document.getElementById("play-game").style.display = "block";
      
      addSmartContractListener();

    } else {
      window.alert("Your balance is empty. You need to add funds to your balance.")
      document.getElementById("start-game").style.display = "block";
      document.getElementById("play-game").style.display = "none";
    }

  }catch(err){
      if (err.code !==4001) {window.alert("You need to connect your metamask account first !")} // 4001 is the code for when user rejects the tx on metamask
  }

}


module.exports = {
    connect,
    deposit,
    withdraw, 
    getCurrentBudgetOfContract,
    getBalanceInContract,
    getBalance,
    selfDestruct,
    fundProprietaryBudgetOfContract,
    addGain,
    substractLost,
    startGameInit
}


