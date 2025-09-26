pragma solidity^0.6.1;
//返回值带结构体
pragma experimental ABIEncoderV2;
//结构体可以声明在合约外部
struct Bank {
    string name;
    uint256 amount;
}

contract data_demo {
		//银行信息
    Bank bank;
  	//构造函数，给银行初始化
    constructor(string memory _name, uint256 _amount) public {
        bank.name = _name;
        bank.amount  = _amount;
    }
  	//返回银行信息
    function getBank() public view returns (Bank memory) {
        return bank;
    }
}
contract call_demo {
  	//引用前一合约的数据
    data_demo data;
  	//构造时，要指定前一合约的地址
    constructor(address addr) public {
        data = data_demo(addr);
    }
  	//合约可以对data_demo的地址进行更新
    function upgrade(address _addrV2) public {
        data = data_demo(_addrV2);
    }
  	//调用data_demo的getBank方法
    function getData() public view returns (Bank memory) {
        return data.getBank();
    }
}