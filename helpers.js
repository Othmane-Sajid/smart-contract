// TODO : Create event for METAMASK CONNECTED. 
// Si une fonction autre que connect est appelee, il faut verifier si metamask est connecte avant de run()

const { ethers } = require("ethers");
var Web3 = require('web3');

// const contractAddress = "0x8dfDd5Ce848f71F52ee89F57DCe681AB52E92127"; //Address of contract deployed on Ropsten testnet
const contractAddress = "0xeFB72829f36428953Fb94658D147Fc2E2cB6fA67"; //Address of second version (small modifs on contract, mainly added the fund method)
const abi = [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor",
      "payable": true
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "player",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "BalanceChange",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "ContractFundedByOwner",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "ReceivedFunds",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "fundProprietaryBudgetOfContract",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "addGain",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "substractLost",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "withDraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "withdrawUser",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getTotalBalanceInContract",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getCurrentBudgetOfContract",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "selfDestruct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

var account;
window.playerAcceptChallenge = false;

async function addSmartContractListener() {
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(abi,contractAddress);

  window.contract.events.BalanceChange({}, (error, data) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("depot a l'adresse: " + data.returnValues[0] + " : " + data.returnValues[1]);
      window.playerAcceptChallenge = true;
    }
  });
}


async function connect() {
    if (typeof window.ethereum !== "undefined" ) {
        console.log("Metamask is present ");
        const userAccounts = await ethereum.request ({method: "eth_requestAccounts"});
        account = userAccounts[0];
        console.log("Connected to Metamask, account : " + account)
        // document.getElementById("status-metamask".innerHTML="Connected to metamask. Account :" + account);
        var strConnect = String(account).substring(0, 5) + " ... " + String(account).substring(38);
        document.getElementById("status-metamask").innerHTML="Connected to metamask." +  "<br>" + 
                                                              `Account : ${strConnect}`;

        addSmartContractListener();
    }
}


async function withdraw() {

    // needs : 
    // address
    // contract ABI (blueprint to interact with contract)
    // function 
    // node connection 

    
    const provider = new ethers.providers.Web3Provider(window.ethereum); // Designs metamask as our provider. So we can connect to the user's metamask 
    // everytime someone executes a transaction, he needs to SIGN it. So we can get it from the provider (i.e. metamask of the user)
    // this is going to get the connected account 
    const signer = provider.getSigner();
    // indicates that we are going to interact with the contract at contractAddress, using this abi, and any function called is going to be called by the signer (the person signed in with metamask)
    const contract = new ethers.Contract(contractAddress, abi, signer); 

    // await contract.store(42); // function in our simpleStorage contract    
    await contract.withDraw();
}

async function deposit() {
    // needs : 
    // address
    // contract ABI (blueprint to interact with contract)
    // function 
    // node connection 

    
    // const provider = new ethers.providers.Web3Provider(window.ethereum); // Designs metamask as our provider. So we can connect to the user's metamask 
    // // everytime someone executes a transaction, he needs to SIGN it. So we can get it from the provider (i.e. metamask of the user)
    // // this is going to get the connected account 
    // const signer = provider.getSigner();
    // // indicates that we are going to interact with the contract at contractAddress, using this abi, and any function called is going to be called by the signer (the person signed in with metamask)
    // const contract = new ethers.Contract(contractAddress, abi, signer); 

    // await contract.store(42); // function in our simpleStorage contract    

    // VERSION 2 of connecter. Handles input as argument while previous one has trouble with it
    //window.web3 = await new Web3(window.ethereum)
    //window.contract = await new window.web3.eth.Contract(abi,contractAddress)

    var amountToDeposit = document.getElementById("depositAmountInput").value;
    amountToDeposit = Web3.utils.toWei(amountToDeposit, 'ether'); 
    if (amountToDeposit<= 0) {
        window.alert("The amount must be greater than 0.")
    }
    // if ("metamask not connected ... ") {

    // }
    else {
        // await contract.deposit().send({from : account, value: amountToDeposit});
        await window.contract.methods.deposit().send({from:account, value:amountToDeposit})
        // await contract.deposit(account, {value: ethers.utils.parseEther(amountToDeposit)});
        
        
    }
}


async function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer); 

    balanceOfUser = await contract.getBalance()
    balanceOfUser = Web3.utils.fromWei(balanceOfUser.toString(), 'ether'); 

    document.getElementById("user-balance").innerHTML=`Your balance : ${balanceOfUser}`;

}

async function getBalanceInContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer); 

    totalBalanceInContract = await contract.getTotalBalanceInContract();
    totalBalanceInContract = Web3.utils.fromWei(totalBalanceInContract.toString(), 'ether'); 

    document.getElementById("total-balance").innerHTML=`Total balance in contract : ${totalBalanceInContract}`;
}

async function getCurrentBudgetOfContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer); 

    currentBudgetOfContract = await contract.getCurrentBudgetOfContract();
    currentBudgetOfContract = Web3.utils.fromWei(currentBudgetOfContract.toString(), 'ether'); 

    document.getElementById("proprietary-budget-contract").innerHTML=`Propietary budget of the contract : ${currentBudgetOfContract}`;
}

async function selfDestruct() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer); 

    await contract.selfDestruct();
}

async function fundProprietaryBudgetOfContract() {
    window.web3 = await new Web3(window.ethereum)
    window.contract = await new window.web3.eth.Contract(abi,contractAddress)

    var amountToDeposit = document.getElementById("fundBudgetInput").value;
    amountToDeposit = Web3.utils.toWei(amountToDeposit, 'ether'); 
    if (amountToDeposit<= 0) {
        window.alert("The amount must be greater than 0.")
    }
    // if ("metamask not connected ... ") {

    // }
    else {
        // await contract.deposit().send({from : account, value: amountToDeposit});
        await window.contract.methods.fundProprietaryBudgetOfContract().send({from:account, value:amountToDeposit})
        // await contract.deposit(account, {value: ethers.utils.parseEther(amountToDeposit)});
    }
}




// async function playRound(arguments...) {

// }


module.exports = {
    connect,
    deposit,
    withdraw, 
    getCurrentBudgetOfContract,
    getBalanceInContract,
    getBalance,
    selfDestruct,
    fundProprietaryBudgetOfContract
}