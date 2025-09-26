pragma solidity ^0.6.1;

contract redpacket {
    address payable public tuhao; // 土豪地址
    uint public number; // 红包数量

    // 构造函数：部署时需传入红包数量和以太币（msg.value）
    constructor(uint _number) payable public {
        require(_number > 0, "红包数量必须大于0");
        require(msg.value > 0, "必须转入以太币作为红包金额");
        tuhao = msg.sender;
        number = _number;
    }

    // 获取合约余额
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // 抢红包函数
    function stakeMoney() public returns (bool) {
        require(number > 0, "红包已抢完");
        require(getBalance() > 0, "红包余额已空");

        uint balance = getBalance();
        uint amount;

        // 最后一个红包：取走全部剩余余额
        if (number == 1) {
            amount = balance;
        } else {
            // 非最后一个红包：随机分配10%~90%（避免0）
            uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, number))) % 90 + 10; // 10~90
            amount = balance * random / 100;
            // 确保金额至少为1 wei（防止极端情况）
            if (amount == 0) {
                amount = 1;
            }
        }

        // 转账给抢红包的人（外部账户一定会成功，合约账户需有fallback函数）
        msg.sender.transfer(amount);
        number--; // 剩余红包数减1

        return true;
    }

    // 合约销毁：仅土豪可调用
    function kill() public {
        require(msg.sender == tuhao, "仅土豪可销毁合约");
        selfdestruct(tuhao);
    }
}
