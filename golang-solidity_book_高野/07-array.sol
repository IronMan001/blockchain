pragma solidity^0.6.1;
pragma experimental ABIEncoderV2;  // 启用实验性功能

contract array_demo {
    string[5] public names;
    uint256[] public ages;
    constructor() public {
        names[0] = "yekai";
        //names.push("fuhongxue");//can not do this
        ages.push(10);
    }
    function getLength() public view returns(uint256, uint256) {
        return (bytes(names[0]).length,ages.length);
    }

    function setName(string memory name) public {
        names[0] = name;
    }

    function pushNewAge(uint256 age) public {
        ages.push(age);
    }

    function getNames() public view returns (string[5] memory){
        return names;
    }

}