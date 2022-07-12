// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GamblerToken {
    address owner;
    mapping(address => uint256) public balances;
    uint currentBudgetOfContract;
    address[] playersAddresses;

    event ReceivedFunds();

    constructor() payable{
        owner = msg.sender;
        currentBudgetOfContract = msg.value;
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        if(!exist(msg.sender)){
            playersAddresses.push(msg.sender);
        }
    }

    function addGain() public payable{
        require(currentBudgetOfContract >= msg.value, "not enough token in contract");
        balances[msg.sender] += msg.value;
        currentBudgetOfContract -= msg.value;
    }

    function substractLost() public payable{
        require(balances[msg.sender] >= msg.value, "not enough token in player balance");
        balances[msg.sender] -= msg.value;
        currentBudgetOfContract += msg.value;
    }

    function withDraw() public payable{
        this.withdrawUser(msg.sender);
    }
    
    function withdrawUser(address user) public payable{
        require(currentBudgetOfContract >= 0, "not enough token in contract");
        uint256 balanceToSend = balances[user];
        balances[user] = 0;
        (bool success, ) = user.call{value:balanceToSend}("");
        require (success, "Failure to withdraw");
    }

    function getBalance() public view returns (uint256){
        return balances[msg.sender];
    }

    function getTotalBalanceInContract() public view returns (uint256){
        return address(this).balance;
    }

    function getCurrentBudgetOfContract() public view returns (uint256){
        return currentBudgetOfContract;
    }

    /* La fonction retourne true si l'adresse est dans la l'array playersAdresses
       C'est une fct utilitaire qui permet d'eviter les doublons d'adresses*/
    function exist(address addr) private view returns(bool){
        for(uint i =0; i < playersAddresses.length; i++){
            if(playersAddresses[i] == addr){
                return true;
            }
        }
        return false;
    }

    /* La fonction est appelable uniquement par le proprio.
       Retourne les fonds des joueurs qui ont leurs addresse dans l'array
       Apres le contrat s'auto detruit*/
    function selfDestruct() public {
        require(msg.sender == owner);
        for(uint i =0; i < playersAddresses.length; i++){
            withdrawUser(playersAddresses[i]);
        }
        selfdestruct(payable(msg.sender));
    }

}
