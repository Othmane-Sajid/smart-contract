
const helper = require("./helpers.js");

const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const turn = 100;

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
    console.log(playerBet);
    if(result[1].isBankrupt()){
        
        helper.substractLost(playerBet);
        return "lost"
    }
    helper.addGain(gamblerBet);
    return "win"
    
}


btn0.addEventListener('click', function handleClick(){
    
    btn0.innerHTML = play(turn, turn/2, window.playerBet, window.playerBet/2);
    
});

btn1.addEventListener('click', function handleClick(){

    btn1.innerHTML = play(turn, turn, window.playerBet, window.playerBet);
    
});

btn2.addEventListener('click', function handleClick(){

    btn2.innerHTML = play(turn, turn * 1.5, window.playerBet, window.playerBet * 1.5);
    
});

btn3.addEventListener('click', function handleClick(){

    btn3.innerHTML = play(turn, turn * 2, window.playerBet, window.playerBet * 2);
    
}); 