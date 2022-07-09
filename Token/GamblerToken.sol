// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GamblerToken {
    address owner;
    mapping(address => uint256) public balances;
    uint256 currentBudgetOfContract;

    event ReceivedFunds();
    
    constructor(){
        owner = payable(msg.sender);
        currentBudgetOfContract = 100; // Il faut transférer 100 ETH au smart contract lors de l'initialisation 
        // balances[owner] = currentBudgetOfContract; // Autre facon de faire. A voir.
    }

    receive() external payable { // Besoin d'implémenter une fonction receive pour pouvoir recevoir des ETH dans le contrat
        // deposit() // ??
        // emit ReceivedFunds(msg.sender, msg.value);
        emit ReceivedFunds();
    }


    function deposit() payable public {
        // balances[msg.sender] = msg.value;
        balances[msg.sender] += msg.value; // J'ai ajoute le += puisqu'on peut déposer à répétition dans le smart contract
    }

    // function getBalance(address user) public view returns(uint256){
    //     require(msg.sender == user);
    //     return balances[user];
    // }

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

    // function withdraw() public payable{
    function withdrawAmount(uint amountToWithdraw) public payable{  
        // Pattern checks-effects-interactions 

        //checks 
        require(msg.sender == owner);  // POURQUOI ca doit être le owner ?? Seulement le owner du contract peut initier les withdrawals ? À discuter. 
        require(balances[msg.sender] >= amountToWithdraw, "Insufficient funds");

        // effects 
        balances[msg.sender] -= amountToWithdraw;

        // interactions
        //payable(msg.sender).transfer(address(this).balance); // J'ai remplacé .transfer par .call. C'est ce qui est recommandé maintenant https://consensys.github.io/smart-contract-best-practices/development-recommendations/general/external-calls/#dont-use-transfer-or-send
        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");

        require (success, "Failure to withdraw");
    }

   
    function withdrawBalance() public payable{  
        // Pour qu'un joueur retire la totalité de sa balance 
        uint256 balanceOfUser = balances[msg.sender];
        withdrawAmount(balanceOfUser);
    }


    function withdrawUser(address payable user) public payable returns (bool){  
        require(msg.sender == user, "user and sender are not the same");
        require(address(this).balance >= balances[msg.sender], "not enough token in contract");

        uint256 balanceToSend = balances[msg.sender];
        balances[msg.sender] = 0;  
        user.transfer(balanceToSend);
        return true;
    }

    function payWinner(address winner, uint256 amount) public payable returns (bool){
        require(balances[msg.sender] > amount, "not enough fund in sender balance");
        balances[msg.sender] -= amount;
        balances[winner] += amount;       
        return true;
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
}
