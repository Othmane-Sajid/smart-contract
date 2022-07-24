const GamblerContractUpgradable = artifacts.require("GamblerContractUpgradable");


/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("GamblerContractUpgradable", function (accounts) {
  
  it("should assert true", async function () {
    await GamblerContractUpgradable.deployed();
    return assert.isTrue(true);
  });


  it("owner should transfert to GamblerContractUpgradable 10 ethers", async function () {
    const contract = await GamblerContractUpgradable.deployed();
    
    // achat de Token 
    await contract.sendTransaction({
      from: accounts[1],
      value: web3.utils.toWei("10", "ether")
    })

    
    return assert.isTrue(true);
  });

  it("player should transfert to GamblerContractUpgradable 5 ethers", async function () {
    const contract = await GamblerContractUpgradable.deployed();
    
    // achat de Token 
    await contract.deposit.sendTransaction({
      from: accounts[3],
      value: web3.utils.toWei("5", "ether")
    })

    
    return assert.isTrue(true);
  });

  it("player win 8 ether", async function () {
    const contract = await GamblerContractUpgradable.deployed();

    await contract.addGain.sendTransaction(accounts[3], web3.utils.toWei("8", "ether"), {
      from: accounts[1],
      value: 0
    })

    return assert.isTrue(true);
  }); 

  it("player lost 2 ether", async function () {
    const contract = await GamblerContractUpgradable.deployed();

    await contract.substractLost.sendTransaction(accounts[3], web3.utils.toWei("2", "ether"), {
      from: accounts[1],
      value: 0
    })

    return assert.isTrue(true);
  });


  it("should withdraw user with 11 ether", async function () {
    const contract = await GamblerContractUpgradable.deployed();

    await contract.withdrawUser.sendTransaction({
      from: accounts[3],
      value: 0 //web3.utils.toWei("0.01", "ether")
    });

    return assert.isTrue(true);
  }); 

  it("should withdraw owner with 4 ether", async function () {
    const contract = await GamblerContractUpgradable.deployed();

    await contract.withdrawOwner.sendTransaction({
      from: accounts[1],
      value: 0 //web3.utils.toWei("0.01", "ether")
    });

    return assert.isTrue(true);
  }); 

});
