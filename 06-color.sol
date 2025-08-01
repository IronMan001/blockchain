pragma solidity^0.6.1;

contract func_demo3 {
    address  admin;
    uint256  count;
    constructor() public {
        admin = msg.sender;
        count = 2020;
    }
    function setCount(uint256 _count) external {
        count = _count;
    }
    function withDraw() public payable {
        
    }
    
    function getCount() public view returns(uint256) {
        return count;
    }
}