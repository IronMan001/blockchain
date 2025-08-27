package main

import (
	"fmt"
	"log"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)


func main() {
	conn,err :=ethclient.Dial("http://localhost:8545")
	if err != nil {
		log.Fatal("failed to connect the Ethereum client:%v",err)
	}
	defer conn.Close()
//	demoIns,err :=NewCalldemo(common.HexToAddress("0x81696fFd9Cbfffe581fb572a321059f9764dD4E3"),conn)
	demoIns,err :=NewCalldemo(common.HexToAddress("0x9d9Fd9fA30c78A92fC32AAaaBE1C4202D9552cf7"),conn)
	if err != nil {
		log.Fatal("failed to NewCalldemo: %v",err)
	}
	val,err :=demoIns.GetCount(nil)
	if err != nil {
		log.Fatal("failed to GetCount: %v",err)
	}
	fmt.Println(val)
}
