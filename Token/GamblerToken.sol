// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GamblerToken {
    address owner;
    mapping(address => uint256) public balances;
    
    constructor(){
        owner = msg.sender;
    }
    
    function deposit() payable public {
        balances[msg.sender] = msg.value;
    }

    function getBalance(address user) public view returns(uint256){
        require(msg.sender == user);
        return balances[user];
    }
 
    function withdraw() public payable{  
        require(msg.sender == owner);  
        payable(msg.sender).transfer(address(this).balance);
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

}
