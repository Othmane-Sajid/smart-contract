
const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

btns = [btn0, btn1, btn2, btn3];

difficulty = [];

function play(bet){
    adr0= "0x7";
    let player = new Player(adr0, bet);
    let gambler = new Player(adr0, bet);
    
    let game = new Game();
    
    let result = game.play(player, gambler);
    if(result[1].isBankrupt()){
        return "loose"
    }
    return "win"
    
}


btn0.addEventListener('click', function handleClick(){
    let bet = parseInt(btn0.innerHTML);
    btn0.innerHTML = play(bet);
});

btn1.addEventListener('click', function handleClick(){
    let bet = parseInt(btn1.innerHTML);
    btn1.innerHTML = play(bet);
});

btn2.addEventListener('click', function handleClick(){
    let bet = parseInt(btn2.innerHTML);
    btn2.innerHTML = play(bet);
});

btn3.addEventListener('click', function handleClick(){
    let bet = parseInt(btn3.innerHTML);
    btn3.innerHTML = play(bet);
}); 










