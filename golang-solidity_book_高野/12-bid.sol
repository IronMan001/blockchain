pragma solidity^0.6.1;

contract auction {
    
    address payable public seller;// 委托人
    address payable public auctioneer;// 拍卖师
    // 记录最高出价者地址，最终的买受人
    address payable public buyer;
    uint public auctionAmount;//最高金额 
    //拍卖结束时间点
    uint auctionEndTime ;
  	//拍卖结束标志
    bool isFinshed;
    //构造函数
    constructor(address payable _seller, uint _duration) public {
        seller = _seller;
      	auctioneer = msg.sender;
      	//可以设定拍卖结束的时限
        auctionEndTime = _duration + now;
        isFinshed = false;
    }
    //竞拍 
    function bid() public payable {
        require(!isFinshed);//竞拍未结束
        require(now < auctionEndTime);// 时间限制内
        require(msg.value > auctionAmount);
        if (auctionAmount > 0 && address(0) != buyer) {
            buyer.transfer(auctionAmount);//退钱给上一买家
        }
      	//保留新买家
        buyer = msg.sender;
        auctionAmount = msg.value;
    }
    //结束竞拍 
    function auctionEnd() public payable {
        require(now >= auctionEndTime);//超过竞拍事件后，方可结束
      	//竞拍尚未结束
        require(!isFinshed);
        isFinshed = true;
      	//给卖家打钱
        seller.transfer(auctionAmount);
    }
}