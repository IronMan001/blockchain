pragma solidity^0.6.1;

contract map_demo {
  	//定义address与姓名的mapping
    mapping(address=>string) public addr_names;
    constructor() public {
        addr_names[msg.sender] = "yekai";
    }
    //设置地址对应的姓名
    function setNames(string memory _name) public {
        addr_names[msg.sender] = _name;
    }
    
}