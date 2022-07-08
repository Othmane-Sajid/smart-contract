

class Game{

    play(p1, p2){
        
        let players = new Array(p1, p2);
        var bankrupt = false;
        var turn = players[0].choice();

        while (bankrupt==false){
        
            var player_bet = players[(turn + 1) % 2].choice();
            var player_flip = players[turn % 2].flip();

            if (player_flip == player_bet){        
                players[(turn + 1) % 2].addOnePennie(); 
                players[turn % 2].substractOnePennie();
            }else{
                players[(turn + 1) % 2].substractOnePennie();
                players[turn % 2].addOnePennie();
            }
   
            if (players[0].isBankrupt() || players[1].isBankrupt()){
                bankrupt = true;
            }
            
            turn += 1;           
        }       
        return new Array(players[0].getPennies(), players[1].getPennies());
    }
}

