// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GamblerToken {
    address owner;
    mapping(address => uint256) public balances;
    uint currentBudgetOfContract;

    event ReceivedFunds();
    
    constructor(){
        owner = 0xb28256D9Bd20904a2aaC1C41127f47c9Cab762f0;  //hard code pour les tests
        currentBudgetOfContract = 0; 
    }

    receive() external payable { // on peut utiliser cette fonction pour transferer les ether au contrat
        currentBudgetOfContract += msg.value; // et incrementer la variable en meme temps
        emit ReceivedFunds();
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value; 
    }

    function addGain(address player, uint amount) public{
        require(currentBudgetOfContract >= amount);
        balances[player] += amount;
        currentBudgetOfContract -= amount;
    }

    function substractLost(address player, uint amount) public{
        require(balances[player] >= amount, "not enough token in player balance");
        balances[player] -= amount;
        currentBudgetOfContract += amount;
    }

    function withdrawOwner() public payable{  
        require(msg.sender == owner);    
        currentBudgetOfContract = 0;
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require (success, "Failure to withdraw");
    }

    function withdrawUser() public payable{  
        require(currentBudgetOfContract >= 0, "not enough token in contract");
        uint256 balanceToSend = balances[msg.sender];
        balances[msg.sender] = 0;  
        (bool success, ) = msg.sender.call{value:balanceToSend}("");
        require (success, "Failure to withdraw");
    }

    function getBalance() public view returns (uint256){ // VERSION PAR DEFAUT. Similaire a ce qu on a vu dans le cours. 
        return balances[msg.sender];
    }

    function getTotalBalanceInContract() public view returns (uint256){ 
        // Balance totale du smart-contract. Inclut (1) les balances des joueurs et (2) ce que le contrat possede pour jouer contre les joueurs
        return address(this).balance;
    }

    function getCurrentBudgetOfContract() public view returns (uint256){
        // Seulement la partie de la balance totale que le contrat peut utiliser comme sienne.
        return currentBudgetOfContract;
    }

    // function selfDestruct() { // Besoin d'implementer/overload ?         
    // }
    function selfDestruct() public {
        require(msg.sender == owner);
        // 1- send to each user his remaining funds in the mapping balances
        // for ... withdraw

        // 2- selfdestruct contract
        selfdestruct(payable(msg.sender));
    }

    /* receive() external payable { // Besoin d'implémenter une fonction receive pour pouvoir recevoir des ETH dans le contrat
        // deposit() // ??
        // emit ReceivedFunds(msg.sender, msg.value);
        emit ReceivedFunds();
    } */

    // function getBalance(address user) public view returns(uint256){
    //     require(msg.sender == user);
    //     return balances[user];
    // }

    /* function withdrawBalance() public payable{  
        // Pour qu'un joueur retire la totalité de sa balance 
        uint256 balanceOfUser = balances[msg.sender];
        withdrawAmount(balanceOfUser);
    } */

        /* function payWinner(address winner, uint256 amount) public payable returns (bool){
        require(balances[msg.sender] > amount, "not enough fund in sender balance");
        balances[msg.sender] -= amount;
        balances[winner] += amount;       
        return true;
    } */
}
