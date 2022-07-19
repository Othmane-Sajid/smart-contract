
const helper = require("./helpers.js");

const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const turn = 500;

class Game{
    play(p1, p2){
        
        let players = new Array(p1, p2);
        var turn = players[0].choice();

        while (!(players[0].isBankrupt() || players[1].isBankrupt())){
        
            var player_bet = players[(turn + 1) % 2].choice();
            var player_flip = players[turn % 2].flip();

            if (player_flip == player_bet){        
                players[(turn + 1) % 2].addOnePennie(); 
                players[turn % 2].substractOnePennie();
            }else{
                players[(turn + 1) % 2].substractOnePennie();
                players[turn % 2].addOnePennie();
            }
            
            turn += 1;           
        }   
        return players;
        
    }
}

class Player{
        
    constructor(address, pennies){
        this.address = address;
        this.pennies = pennies;
    }

    addOnePennie(){
        this.pennies += 1;
    }

    substractOnePennie(){
        this.pennies -= 1;
    }

    isBankrupt(){
        return this.pennies == 0;
    }

    getPennies(){
        return this.pennies;
    }

    choice(){
        let min = Math.ceil(0);
        let max = Math.floor(100);
        return Math.floor(Math.random() * (max - min + 1)) % 2;
    }

    flip(){
        return this.choice();
    }

    getAddress(){
        return this.address;
    }
}

function play(playerTurn, gamblerTurn, playerBet, gamblerBet){
    adr0= "0x7";

    let player = new Player(adr0, playerTurn);
    let gambler = new Player(adr0, gamblerTurn);
    
    let game = new Game();
    
    let result = game.play(player, gambler);

    if(result[1].isBankrupt()){
        
        helper.substractLost(playerBet);
        return "lost"
    }
    helper.addGain(gamblerBet);
    return "win"
    
}


function userWaitReturn(){
    document.getElementById("loaderGameWaiting").style.display = "block";
    document.getElementById("play-game").style.display = "none";

}


btn0.addEventListener('click', function handleClick(){
    
    userWaitReturn();

    resultBtn0 = play(turn, turn/2, window.playerBet, window.playerBet/2);
    btn0.innerHTML = resultbtn0;

    solde = parseFloat(document.getElementById("user-balance-game").innerHTML);

    if(resultbtn0 == "win"){   
        solde += window.playerBet/2;  
    }else{
        solde -= window.playerBet
    }
    document.getElementById("user-balance-game").innerHTML = solde.toFixed(5).toString();
    
});

btn1.addEventListener('click', function handleClick(){
    
    userWaitReturn();

    resultBtn1 = play(turn, turn, window.playerBet, window.playerBet);
    btn1.innerHTML = resultBtn1;
    solde = parseFloat(document.getElementById("user-balance-game").innerHTML);

    if(resultBtn1 == "win"){   
        solde += window.playerBet;  
    }else{
        solde -= window.playerBet
    }
    document.getElementById("user-balance-game").innerHTML = solde.toFixed(5).toString();
    
});

btn2.addEventListener('click', function handleClick(){
    
    userWaitReturn();
    
    resultBtn2 = play(turn, turn * 1.5, window.playerBet, window.playerBet * 1.5);
    btn2.innerHTML = resultBtn2 ;
    solde = parseFloat(document.getElementById("user-balance-game").innerHTML);

    if(resultBtn2  == "win"){   
        solde += window.playerBet * 1.5;  
    }else{
        solde -= window.playerBet
    }
    document.getElementById("user-balance-game").innerHTML = solde.toFixed(5).toString();
    
});

btn3.addEventListener('click', function handleClick(){

    userWaitReturn();
    
    resultBtn3 = play(turn, turn * 2, window.playerBet, window.playerBet * 2);
    btn3.innerHTML = resultBtn3;
    solde = parseFloat(document.getElementById("user-balance-game").innerHTML);

    if(resultBtn3 == "win"){   
        solde += window.playerBet * 2;  
    }else{
        solde -= window.playerBet
    }
    document.getElementById("user-balance-game").innerHTML = solde.toFixed(5).toString();
    
}); 