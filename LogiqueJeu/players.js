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

module.exports ={
    Player
}



