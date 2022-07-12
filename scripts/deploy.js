async function main() {
   const Gambler = await ethers.getContractFactory("GamblerToken");

   // Start deployment, returning a promise that resolves to a contract object
   const gambler_token = await Gambler.deploy({value:10000});
   console.log("Contract deployed to address:", gambler_token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
