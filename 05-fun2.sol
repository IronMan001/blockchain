pragma solidity^0.6.0;

contract func_demo {
    address public admin;
    constructor() public {
        admin = msg.sender;
    }
    function deposit() public payable {
        //nothing to do
    }
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}