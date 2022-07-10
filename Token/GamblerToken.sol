// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GamblerToken {
    address owner;
    mapping(address => uint256) public balances;
    address[] playersAddresses;
    uint256 currentBudgetOfContract;

    event ReceivedFundsByUser();
    event ContractFundedByOwner();
    
    constructor(){
        owner = 0xb28256D9Bd20904a2aaC1C41127f47c9Cab762f0;  //hard code pour les tests
        // owner = msg.sender;
        currentBudgetOfContract = 0; 
    }

    // Je crois que receive n'est plus nécessaire étant donné la nouvelle version de deposit()
    receive() external payable { // on peut utiliser cette fonction pour transferer les ether au contrat
        currentBudgetOfContract += msg.value; // et incrementer la variable en meme temps
        emit ReceivedFunds();
    }

    function deposit() external payable { // pourrait etre public au lieu de external 
        if (msg.sender == owner) { // The owner is funding the contract
            currentBudgetOfContract += msg.value;
            emit ContractFundedByOwner();
        } else { // A player is funding his account
        balances[msg.sender] += msg.value; 
        emit ReceivedFundsByUser();
        }
    }

    function addGain(address player, uint amount) public {
        //checks-effects-interactions
        // Techniquement, le require ne devrait pas etre necessaire, puisque le contrat ne doit pas joeur si il n a pas le budget pour couvrir une perte
        require(currentBudgetOfContract >= amount); 
        currentBudgetOfContract -= amount;
        balances[player] += amount;
    }

    function substractLost(address player, uint amount) public{
        require(balances[player] >= amount, "not enough token in player balance");
        balances[player] -= amount;
        currentBudgetOfContract += amount;
    }

    function withdrawOwner() public payable{ 
        //checks 
        require(msg.sender == owner);    
        //effects
        currentBudgetOfContract = 0;
        //interactions 
        // (bool success, ) = msg.sender.call{value: address(this).balance}("");// Probleme de vol potentiel. Le owner devrait seulement retirer son budget 
        (bool success, ) = msg.sender.call{value: currentBudgetOfContract}("");
        require (success, "Failure to withdraw");
    }

    function withdrawUser() public payable{  
        //checks
        // require(currentBudgetOfContract > 0, "not enough token in contract"); // PAS NECESSAIRE. Seulement la balance du user qui compte ici 
        require(balances[msg.sender] > 0 , "Your balance is empty");
        //effects
        uint256 balanceToSend = balances[msg.sender];
        balances[msg.sender] = 0;
        //interactions  
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

    // selfDestruct() est appelee notamment si le contrat n'a plus assez d'argent pour jouer contre les joueurs (il ne peut plus faire la mise minimale)
    // AUTRE OPTION : si le smart contract n'A plus de budget, on envoie simplement un message du style "Sorry the game is unavaiable now. Please withdraw your funds"
    // ce qui invite le joueur à lancer la prodécure normale de withdrawUser.
    // Cette deuxième option règle le problème qu'on ne PEUT PAS itérer à travers un mapping, ni connaitre le nombre d'addresses.
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
