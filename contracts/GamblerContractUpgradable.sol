// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract GamblerContractUpgradable is Initializable, OwnableUpgradeable {
    // address public owner;
    mapping(address => uint256) public balances;
    uint public currentBudgetOfContract;
    address[] playersAddresses;

    event ReceivedFunds();
    event ContractFundedByOwner();
    event BalanceChange(address player, uint amount);
    event AddGainEvent(address player, uint balance);
    event SubstractLostEvent(address player, uint balance);

    // constructor() payable{
    //     owner = msg.sender;
    //     currentBudgetOfContract = msg.value;
    // }

    // Upgradable contracts need an an initialize function rather than a constructor.

    function initialize() initializer public {
        __Context_init_unchained();
        __Ownable_init_unchained();
    }

    // modifier isOwner {
    //     require(msg.sender == owner);
    //     _;
    // }

    

    function fundProprietaryBudgetOfContract() public payable {
        currentBudgetOfContract += msg.value;
        emit ContractFundedByOwner();
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        if(!exist(msg.sender)){
            playersAddresses.push(msg.sender);
        }
        emit BalanceChange(msg.sender, msg.value);
    }

    function addGain(uint amount) public payable{
        require(currentBudgetOfContract >= amount, "not enough token in contract");
        currentBudgetOfContract -= amount;
        balances[msg.sender] += amount;
        emit AddGainEvent(msg.sender, balances[msg.sender]);
    }

    function substractLost(uint amount) public payable{
        require(balances[msg.sender] >= amount, "not enough token in player balance");
        balances[msg.sender] -= amount;
        currentBudgetOfContract += amount;
        emit SubstractLostEvent(msg.sender, balances[msg.sender]);
    }

    function withDraw() public payable{ 
        this.withdrawUser(msg.sender);
    }
    
    function withdrawUser(address user) public payable{
        //checks
        require(currentBudgetOfContract >= 0, "not enough token in contract");
        //effects
        uint256 balanceToSend = balances[user];
        balances[user] = 0;
        //interactions
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

    /* La fonction retourne true si l'adresse est dans l'array playersAdresses
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
       Retourne les fonds des joueurs qui ont leurs addresses dans l'array
       Apres le contrat s'auto detruit*/
    function selfDestruct() public onlyOwner  {
        for(uint i =0; i < playersAddresses.length; i++){
            withdrawUser(playersAddresses[i]);
        }
        // selfdestruct(payable(msg.sender)); //selfdestruct not allowed in upgradable contracts
        uint256 remainingFunds = address(this).balance;
        address owner_ = owner();
        (bool success, ) = owner_.call{value:remainingFunds}("");
    }
}