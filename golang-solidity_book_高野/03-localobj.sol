pragma solidity^0.6.1;

contract localobj {
    address public admin;
    bytes32 public hash;
    uint256 public randnum;
    
    constructor() public {
        admin = msg.sender;
        hash = blockhash(0);
        randnum = uint256(keccak256(abi.encode(now, msg.sender, hash))) % 100;
    }
}