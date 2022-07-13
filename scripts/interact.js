
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/GamblerToken.sol/GamblerToken.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const Gambler = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer); 

function addSmartContractListener() {
  Gambler.events.BalanceChange({}, (error, data) => {
    if (error) {
      console.log(error.message)
    } else {
      console.log(data.returnValues[0])
    }
  })
}

async function getAccountsFromProvider(){
  const accounts = await alchemyProvider.listAccounts();
  return accounts;
}

async function buyGamblerToken(address, amount){
  const tx = await Gambler.deposit({
    from:address,
    value: amount
  });
  tx.wait;
  
}

async function getCurrentBudgetOfContract(){
  const tx = await Gambler.getCurrentBudgetOfContract();
  tx.wait;
  return tx;
}

async function addGain(address, amount){
  const tx = await Gambler.addGain(amount,{
    from: address
  });
  tx.wait;
}

async function substractLost(address, amount){
  const tx = await Gambler.substractLost(amount,{
    from:address
  });
  tx.wait;
}

async function getBalance(){
  const tx = await Gambler.getBalance();
  tx.wait;
  return tx;
}

async function getBalanceInContract(){
  const tx =await Gambler.getTotalBalanceInContract();
  tx.wait;
  return tx;
}

async function withDraw(address){
  const tx = Gambler.withDraw({from:address});
  tx.wait;
}

async function seflDestruct(){
  await Gambler.selfDestruct();
}


async function main() {
  //await addSmartContractListener();
  address = "0x0569C0B6171d9491afd28A432c44e494F5672CCa";
//console.log(await getAccountsFromProvider()); 
//console.log("The budget is: " + await getCurrentBudgetOfContract());
try{
  //await buyGamblerToken(address, 100);
}catch(err){
  console.log(err);
}

try{
  //await addGain(address, 10);
}catch(err){
  console.log(err);
}

try{
  //await substractLost(address, 50);
}catch(err){
  console.log(err);
}

try{
  //await substractLost(address, 100);
}catch(err){
  console.log(err);
}

try{
  //await addGain(address, 10000000);
}catch(err){
  console.log(err);
}

try{
  //await withDraw(address);
}catch(err){
  console.log(err);
}

console.log("The budget is: " + await getCurrentBudgetOfContract());
console.log("the balance is " + await getBalance());
console.log("the Contract balance is " + await getBalanceInContract());

//await Gambler.selfDestruct();

}

main();
