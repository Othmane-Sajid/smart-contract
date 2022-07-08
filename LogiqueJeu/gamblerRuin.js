


async function playGame(){
    await getGamblerToken();

    var bet0 = parseInt(document.getElementById("betPlayer0").value);
    var bet1 = parseInt(document.getElementById("betPlayer1").value);
    let player1 = new Player("Alice", bet0);
    let player2 = new Player("Bob", bet1);
    
    let game = new Game();
    
    let result = game.play(player1, player2);
    
    document.getElementById("betPlayer0").value = result[0];
    document.getElementById("betPlayer1").value = result[1];

    //verifie le solde avant le transfert
    if(await window.contract.methods.getBalance(accounts[2]).call({from:accounts[2]}) > 0){
      await window.contract.methods.payWinner(accounts[3], web3.utils.toWei("0.5", "ether")).send({
        from: accounts[2],
        value: 0
      }, function (err) {
        if (err) {
          console.log(err)
          return
        }
      });
    }

    try{
      await window.contract.methods.withdrawUser(accounts[2])
      .send({from: accounts[2]});

    }catch(err){
      console.log(err);
    }
    

    await window.contract.methods.withdrawUser(accounts[3]).send({
      from: accounts[3]
    }, function (err) {
      if (err) {
        console.log(err)
        return
      }
    });
}

async function getGamblerToken(){
  // achat de Token
  await window.contract.methods.deposit().send({
    from: accounts[2],
    value: web3.utils.toWei("1", "ether")
  });

  await window.contract.methods.deposit().send({
    from: accounts[3],
    value: web3.utils.toWei("1", "ether")
  }); 

}