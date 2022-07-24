// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract GamblerContractUpgradable is Initializable, OwnableUpgradeable {
    mapping(address => uint256) public balances;
    uint public currentBudgetOfContract;
    address[] playersAddresses;

    event ContractFundedByOwner();
    event BalanceChange(address player, uint amount);
    event AddGainEvent(address player, uint balance);
    event SubstractLostEvent(address player, uint balance);

    // constructor() payable{
    //     owner = msg.sender;
    //     currentBudgetOfContract = msg.value;
    // }


    // For upgradable contracts following OpenZeppelin standards, constructor objects are undesired.
    // They are replaced by an intializer (takes the role of the constructor).
    function initialize() initializer public {
        __Context_init_unchained();
        __Ownable_init_unchained();
    }

    modifier balanceUserNotNull {
        require(balances[msg.sender]>= 0, "The user's balance is empty");      
        _;
    }

    function fundProprietaryBudgetOfContract() public payable onlyOwner {
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
        //checks-effects-interactions
        require(currentBudgetOfContract >= amount, "Not enough funds in contract");
        currentBudgetOfContract -= amount;
        balances[msg.sender] += amount;
        emit AddGainEvent(msg.sender, balances[msg.sender]);
    }

    function substractLost(uint amount) public payable{
        //checks-effects-interactions
        require(balances[msg.sender] >= amount, "Not enough funds in the player's balance");
        balances[msg.sender] -= amount;
        currentBudgetOfContract += amount;
        emit SubstractLostEvent(msg.sender, balances[msg.sender]);
    }

    function withDraw() public payable{ 
        this.withdrawUser(msg.sender);
    }
    
    function withdrawUser(address user) public payable balanceUserNotNull{
        //checks
        require(address(this).balance >= balances[msg.sender] , "Not enough funds in contract. Please try again later.");
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

    /* Utility function that returns true if the address is present in the array playerAddresses.
        Used to avoid duplicates. */
    function exist(address addr) private view returns(bool){
        for(uint i =0; i < playersAddresses.length; i++){
            if(playersAddresses[i] == addr){
                return true;
            }
        }
        return false;
    }

    /* Only the owner can call this method to defund the contract by : 
        1- sending back to each user his funds (addresses kept in the array)
        2- recuperating the remaining funds */
    function selfDestruct() public onlyOwner  {
        for(uint i =0; i < playersAddresses.length; i++){
            withdrawUser(playersAddresses[i]);
        }
        uint256 remainingFunds = address(this).balance;
        currentBudgetOfContract=0;
        address owner_ = owner();
        (bool success, ) = owner_.call{value:remainingFunds}("");
    }
}