

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

