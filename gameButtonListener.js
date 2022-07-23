
const helper = require("./helpers.js");

const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const defaultNumPennies = 500;

class Game{

    play(p1, p2){
        
        let players = new Array(p1, p2);
        var nbOfFlip = players[0].choice();

        while (!(players[0].isBankrupt() || players[1].isBankrupt())){
        
            var player_bet = players[(nbOfFlip + 1) % 2].choice();
            var player_flip = players[nbOfFlip % 2].flip();

            if (player_flip == player_bet){        
                players[(nbOfFlip + 1) % 2].addOnePennie(); 
                players[nbOfFlip % 2].substractOnePennie();
            }else{
                players[(nbOfFlip + 1) % 2].substractOnePennie();
                players[nbOfFlip % 2].addOnePennie();
            }
            
            nbOfFlip += 1;           
        }   
        return players;
        
    }
}

class Player{

    constructor(numberOfPennies){
        this.numberOfPennies = numberOfPennies;
    }

    addOnePennie(){
        this.numberOfPennies += 1;
    }

    substractOnePennie(){
        this.numberOfPennies -= 1;
    }

    isBankrupt(){
        return this.numberOfPennies == 0;
    }

    getNumberOfPennies(){
        return this.numberOfPennies;
    }

    // Randomly returns a 0 or a 1.
    choice(){
        return Math.floor(Math.random() * 2);
    }

    flip(){
        return this.choice();
    }
}



async function play(playerNbrPennies, smartContractNbrPennies, playerBetAmount, contractBetAmount){

    let player = new Player(playerNbrPennies);
    let smartContract = new Player(smartContractNbrPennies);
    
    let game = new Game();
    let result = game.play(player, smartContract);

    try{
        // The player lost
        if(result[0].isBankrupt()){
            document.getElementById("loss-amount").innerHTML= " " + parseFloat(playerBetAmount).toFixed(4);
            await helper.substractLost(playerBetAmount);   

        
        } // The player won
        else {
            document.getElementById("win-amount").innerHTML= " " + parseFloat(contractBetAmount).toFixed(4);
            await helper.addGain(contractBetAmount);
        }

    }catch(err){
        manageSpinnerOff();
        console.log(err);
    }
}


function manageSpinnerOn(){
    $('#cover-spin').show(0);
}

function manageSpinnerOff(){
    $('#cover-spin').hide(0);
  }


async function isContractSolvableToBet(playerBet, multiplierReward) {
    // Verifies if the contract has enough budget to reward the player if he wins.
    let budgetOfContract = await helper.getCurrentBudgetOfContract();
    bool = (budgetOfContract > (playerBet * multiplierReward));
    return bool;
}

async function handleBet(multiplierGameMode) {
    var desiredPercentageToBet = document.getElementById("percentBetInput").value;
    var currentBalanceUser = await helper.getBalance();
    var playerBet = currentBalanceUser * desiredPercentageToBet;

    var isContractSolvable = await isContractSolvableToBet(playerBet, multiplierGameMode);
    if ( ! isContractSolvable) {
        window.alert("Sorry. The contract doesn't have the funds required to bet against you. Please withdraw your funds or chose another game mode if the contract still has funds.");
    
    } else {
        manageSpinnerOn();
        await play(defaultNumPennies, defaultNumPennies * multiplierGameMode, playerBet, playerBet * multiplierGameMode);
    
        // verify if user still has funds to bet or no. And hide the playing interface if not.
        helper.startGameInit();
        }
}


btn0.addEventListener('click', async function handleClick(){
    // easy mode
    // The player has 2/3 chances to win. And his reward is equal to 0.5x the amount of his bet.
    try {
        handleBet(0.5);
    }catch(err){
        console.log(err);
    }
});

btn1.addEventListener('click', async function handleClick(){
    // fair mode
    // The player has 50 % chances to win. And his reward is equal to 1x the amount of his bet.
    try {
        handleBet(1);
    }catch(err){
        console.log(err);
    }
});



btn2.addEventListener('click', async function handleClick(){
    // hard mode
    // The player has 40 % chances to win. And his reward is equal to 1.5x the amount of his bet.
    try {
        handleBet(1.5);
    }catch(err){
        console.log(err);
    }
});


btn3.addEventListener('click', async function handleClick(){
    // very hard mode
    // The player has 1/3 chances to win. And his reward is equal to 2x the amount of his bet.
    try {
        handleBet(2);
    }catch(err){
        console.log(err);
    }
});







// btn0.addEventListener('click', async function handleClick(){
//     // easy mode
//     // The player has 2/3 chances to win. And his reward is equal to 0.5x the amount of his bet.

//     var desiredPercentageToBet = document.getElementById("percentBetInput").value;
//     var currentBalanceUser = await helper.getBalance();
//     var playerBet = currentBalanceUser * desiredPercentageToBet;

//     var boolContractSolvable = await isContractSolvableToBet(playerBet, 0.5);
//     if ( ! boolContractSolvable) {
//         window.alert("Sorry. The contract doesn't have the funds required to bet against you. Please withdraw your funds or chose another game mode if the contract still has funds.");
//     } else {
//         window.Click = "btn0";
//         manageSpinnerOn();
//         await play(defaultNumPennies, defaultNumPennies * 0.5, playerBet, playerBet*0.5);

//         // verify if user still has funds to bet or no. And hide the playing interface if not.
//         helper.startGameInit();
//         }
// });

// btn1.addEventListener('click', async function handleClick(){
//     // fair mode
//     // The player has 50 % chances to win. And his reward is equal to 1x the amount of his bet.
//     var desiredPercentageToBet = document.getElementById("percentBetInput").value;
//     var currentBalanceUser = await helper.getBalance();
//     var playerBet = currentBalanceUser * desiredPercentageToBet;

//     var boolContractSolvable = await isContractSolvableToBet(playerBet, 1);
//     if ( ! boolContractSolvable) {
//         window.alert("Sorry. The contract doesn't have the funds required to bet against you. Please withdraw your funds or chose another game mode if the contract still has funds.");
//     } else {
//         window.Click = "btn1";
//         manageSpinnerOn();
//         await play(defaultNumPennies, defaultNumPennies, playerBet, playerBet);

//     // verify if user still has funds to bet or no. And hide the playing interface if not.
//     helper.startGameInit();
//     }
// });


// btn2.addEventListener('click', async function handleClick(){
//     // hard mode
//     // The player has 40 % chances to win. And his reward is equal to 1.5x the amount of his bet.

//     var desiredPercentageToBet = document.getElementById("percentBetInput").value;
//     var currentBalanceUser = await helper.getBalance();
//     var playerBet = currentBalanceUser * desiredPercentageToBet;

//     var boolContractSolvable = await isContractSolvableToBet(playerBet, 1.5);
//     if ( ! boolContractSolvable) {
//         window.alert("Sorry. The contract doesn't have the funds required to bet against you. Please withdraw your funds or chose another game mode if the contract still has funds.");
//     } else {
//         window.Click = "btn2";
//         manageSpinnerOn();
//         await play(defaultNumPennies, defaultNumPennies * 1.5, playerBet, playerBet * 1.5);

//         // verify if user still has funds to bet or no. And hide the playing interface if not.
//         helper.startGameInit();
//         }
// });

// btn3.addEventListener('click', async function handleClick(){
//     // very hard mode
//     // The player has 1/3 chances to win. And his reward is equal to 2x the amount of his bet.
//     var desiredPercentageToBet = document.getElementById("percentBetInput").value;
//     var currentBalanceUser = await helper.getBalance();
//     var playerBet = currentBalanceUser * desiredPercentageToBet;

//     var boolContractSolvable = await isContractSolvableToBet(playerBet, 2);
//     if ( ! boolContractSolvable) {
//         window.alert("Sorry. The contract doesn't have the funds required to bet against you. Please withdraw your funds or chose another game mode if the contract still has funds.");
//         } else {
//         window.Click = "btn3";
//         manageSpinnerOn();
//         await play(defaultNumPennies, defaultNumPennies * 2, playerBet, playerBet * 2);

//         // verify if user still has funds to bet or no. And hide the playing interface if not.
//         helper.startGameInit();
//         }
// });