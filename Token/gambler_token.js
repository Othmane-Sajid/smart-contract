const GamblerToken = artifacts.require("GamblerToken");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("GamblerToken", function (accounts) {
  
  it("should assert true", async function () {
    await GamblerToken.deployed();
    return assert.isTrue(true);
  });


  it("should transfert to GamblerToken", async function () {
    const contract = await GamblerToken.deployed();


    // achat de Token
    await contract.deposit.sendTransaction({
      from: accounts[4],
      value: web3.utils.toWei("1", "ether")
    })

    await contract.deposit.sendTransaction({
      from: accounts[5],
      value: web3.utils.toWei("1", "ether")
    })

    
    return assert.isTrue(true);
  });

  it("loser should pay winner 0.5 ether", async function () {
    const contract = await GamblerToken.deployed();

    await contract.payWinner.sendTransaction(accounts[4], web3.utils.toWei("0.5", "ether"),{
      from: accounts[5],
      value: 0
    });

    return assert.isTrue(true);
  }); 

  it("should withdraw account with 1.5 ether", async function () {
    const contract = await GamblerToken.deployed();

    await contract.withdrawUser.sendTransaction(accounts[4],{
      from: accounts[4],
      value: 0 //web3.utils.toWei("0.01", "ether")
    });

    return assert.isTrue(true);
  }); 

  it("should withdraw account with 0.5 ether", async function () {
    const contract = await GamblerToken.deployed();

    await contract.withdrawUser.sendTransaction(accounts[5],{
      from: accounts[5],
      value: 0 //web3.utils.toWei("0.01", "ether")
    });

    return assert.isTrue(true);
  }); 

  /* it("GamblerToken should withdraw", async function () {
    const contract = await GamblerToken.deployed();

    await contract.withdraw.sendTransaction({
      from: accounts[5],
      value: web3.utils.toWei("0.01", "ether")
    });

    return assert.isTrue(true);
  });*/


});
