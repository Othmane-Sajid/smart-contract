const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/GamblerToken.sol/GamblerToken.json");

//const contract = require("./build/contracts/GamblerToken.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const GamblerContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);


async function getAccountsFromProvider(){
  const accounts = await alchemyProvider.listAccounts();
  return accounts;
}

async function buyGamblerToken(amount){
  await GamblerContract.deposit({
  value: amount
  });
}

async function getCurrentBudgetOfContract(){
  return await GamblerContract.getCurrentBudgetOfContract();
}

async function addGain(amount){
  await GamblerContract.addGain({
    value:amount
  });
}

async function substractLost(amount){
  await GamblerContract.substractLost({
    value:amount
  });
}

async function getBalance(){
  return await GamblerContract.getBalance();
}

async function getBalanceInContract(){
  return await GamblerContract.getTotalBalanceInContract();
}

async function withDraw(){
  await GamblerContract.withDraw();
}

async function seflDestruct(){
  await GamblerContract.selfDestruct();
}

async function main() {

//console.log(await getAccountsFromProvider()); 
//console.log("The budget is: " + await getCurrentBudgetOfContract());
//await buyGamblerToken(100);

//await addGain(10);
//await substractLost(20);

/*console.log("The budget is: " + await getCurrentBudgetOfContract());
console.log("the balance is " + await getBalance());
console.log("the Contract balance is " + await getBalanceInContract());
await withDraw();
await seflDestruct();*/
//await GamblerContract.selfDestruct();

}

main();
