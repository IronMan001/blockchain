pragma solidity^0.6.1;

contract redpacket {
    address payable public tuhao;//定义土豪 
    uint public number ;// 红包数量
  	//构造函数，需要携带msg.values
    constructor(uint _number) payable public {
        tuhao = msg.sender;//谁创建谁就是土豪
        number = _number;//指定红包数量
    }
    //获取余额
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    //抢红包 
    function stakeMoney() public payable returns (bool) {
        require(number > 0);//剩余红包必须大于0
        require(getBalance() > 0); // 判断余额>0 
        number --;//剩余红包数减1
      	//抢到红包的金额采用随机的方式，random是100以内的随机数
        // uint random = uint(keccak256(abi.encode(now,msg.sender,"tuhao"))) % 100;
        // uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, "tuhao"))) % 100;
        uint random = 10;
        uint balance = getBalance();
      	//打给抢红包的人
        msg.sender.transfer(balance * random / 100 );
        return true;
    }
    
    //合约销毁 
    function kill() public {
        require(msg.sender == tuhao);
        selfdestruct(tuhao);//销毁合约，tuhao为受益人
    }
    
}