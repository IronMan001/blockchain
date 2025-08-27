package main

import (
	"context"
	"fmt"
	"log"
	"math/big"
	"os"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/accounts/keystore"
)

func main() {
	// 1. 建立区块链连接
	conn, err := ethclient.Dial("http://localhost:8545")
	if err != nil {
		log.Fatalf("无法连接到以太坊节点: %v", err)
	}
	defer conn.Close()

	// 获取链ID（使用context.Background()作为上下文）
	// 显式设置为启动参数中的--networkid 18
	chainID := big.NewInt(18)
	
	// 验证连接是否正常工作
	blockNumber, err := conn.BlockNumber(context.Background())
	if err != nil {
		log.Fatalf("无法获取区块号，检查节点连接: %v", err)
	}
	log.Printf("当前区块号: %d", blockNumber)
	log.Printf("使用的链ID: %v", chainID)

	// 2. 创建合约实例
	//contractAddr := common.HexToAddress("0x81696fFd9Cbfffe581fb572a321059f9764dD4E3")
	contractAddr := common.HexToAddress("0xBb191C3A10Cb36110097eb1313B68513045fD4B4")
	demoIns, err := NewCalldemo(contractAddr, conn)
	if err != nil {
		log.Fatalf("创建合约实例失败: %v", err)
	}

	// 3. 加载并解密私钥
	keyfile := "/Users/lijiangang/Downloads/ethdev/rungeth/v1.9.10/data/keystore/UTC--2025-07-30T05-43-13.242225000Z--fd08207f18f544d6f98138a6edf5e8e8e80555dd"
	jsonBytes, err := os.ReadFile(keyfile)
	if err != nil {
		log.Fatalf("无法读取密钥文件: %v", err)
	}

	// 使用keystore包解密私钥
	key, err := keystore.DecryptKey(jsonBytes, "123")
	if err != nil {
		log.Fatalf("解密私钥失败: %v", err)
	}

	// 创建支持EIP-1559的交易选项
	opts, err := bind.NewKeyedTransactorWithChainID(key.PrivateKey, chainID)
	if err != nil {
		log.Fatalf("创建交易选项失败: %v", err)
	}

	// 配置交易参数
	opts.GasFeeCap = big.NewInt(100)    // 与启动参数匹配
	opts.GasTipCap = big.NewInt(100)     // 本地链设为0
	opts.GasLimit = 300000             // 足够的gas限制
	opts.Value = big.NewInt(0)         // 不转账

	// 4. 调用合约方法
	tx, err := demoIns.SetCount(opts, big.NewInt(2050))
	if err != nil {
		log.Fatalf("调用SetCount失败: %v", err)
	}

	fmt.Printf("交易已发送: %s\n", tx.Hash().Hex())
	log.Printf("可以使用以下命令在geth控制台查看交易: txpool.inspect")
}
    
