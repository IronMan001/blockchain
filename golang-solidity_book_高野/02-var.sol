pragma solidity^0.6.0;

contract vardefine {
    int256 public AuthAge;
    bytes32 public AuthHash;
    string public AuthName;
    uint256 AuthSal;
    constructor(int256 _age, string memory _name, uint256 _sal) public {
        AuthAge = _age;
        AuthName = _name;
        AuthSal = _sal;
        AuthHash = keccak256(abi.encode(AuthAge,AuthName, AuthSal));
    }

}