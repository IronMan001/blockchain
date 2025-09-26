pragma solidity >0.5.0 < 0.7.0;


contract revert_demo {
    address public admin;
    uint256 public amount;
    
    constructor() public {
        admin = msg.sender;
        amount = 0;
    }
    modifier onlyadmin() {
        require(admin == msg.sender, "only admin can do this");
        _;
    }
    
    function setCount(uint256 _amount1) public onlyadmin {
        amount = _amount1 * 2;
    }
    
    function deposit(uint256 _amount) public payable {
        // require(msg.value == _amount, "msg.value must equal _amount");
        // assert(_amount > 0);
        amount += _amount;
    }
    
}
