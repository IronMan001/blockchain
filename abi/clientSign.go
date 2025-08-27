package main

import (
	"fmt"
	"log"
	"math/big"
	"os"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)


func main(){
	//1 建立区块链连接
	conn,err :=ethclient.Dial("http://localhost:8545")
	if err != nil {
		return 
	}
	defer conn.Close()


	
	//2 创建合约实例
	demoIns,err :=NewCalldemo(common.HexToAddress("0x81696fFd9Cbfffe581fb572a321059f9764dD4E3"),conn)
	// demoIns,err :=NewCalldemo(common.HexToAddress("0x81696fFd9Cbfffe581fb572a321059f9764dD4E3"),conn)
	if err != nil {
		log.Fatal("demoIns is failed:%v",err)
	}
	//3 打开签名文件
	keyfile := "/Users/lijiangang/Downloads/ethdev/rungeth/v1.9.10/data/keystore/UTC--2025-07-30T05-43-13.242225000Z--fd08207f18f544d6f98138a6edf5e8e8e80555dd"
	reader,_ :=os.Open(keyfile)
	//构造一个 交易者的消息
	opts,err :=bind.NewTransactor(reader,"123")
	if err != nil {
		log.Fatal("new NewTransactor is failed: %v",err)
	}
	//4 调用带签名的方法
	tx,err :=demoIns.SetCount(opts,big.NewInt(2050))
	if err != nil {
		log.Fatal("Failed to setCount:%v",err)
	}
	fmt.Println("tx: %v",tx)
	
}