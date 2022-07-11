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


    /* Inscrit le nombres d'ethers transféré par les joueurs dans le mapping
       Mais transfert réellement les ethers a l'adresse du contrat
       Verifie-inscrit l'adresse du joueurs dans la liste playersAdresses*/
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        if(!exist(msg.sender)){
            playersAddresses.push(msg.sender);
        }
    }

    /* Le joueur gagne, on incremente son mapping
       On decremente currentBudgetOfContract (le contrat a perdu)
       Le contrat doit avoir les fonds pour payer sa defaite*/
    function addGain(address player, uint amount) public{
        require(currentBudgetOfContract >= amount, "not enough token in contract");
        balances[player] += amount;
        currentBudgetOfContract -= amount;
    }

     /* Le joueur perd, on decremente son mapping
       On incremente currentBudgetOfContract (le contrat a gagne)
       Le joueur doit avoir les fonds pour payer sa defaite*/
    function substractLost(address player, uint amount) public{
        require(balances[player] >= amount, "not enough token in player balance");
        balances[player] -= amount;
        currentBudgetOfContract += amount;
    }

    /* Le joueur retire ses fonds
       Au minimum le contrat doit ne rien perdre ne rien gagner
       alors, currentBudgetOfContract >= 0 */
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
