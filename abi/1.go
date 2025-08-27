package main

import (
	"context"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	// 1. 连接节点
	client, err := ethclient.Dial("http://localhost:8545")
	if err != nil {
		log.Fatalf("连接节点失败: %v", err)
	}

	// 2. 合约地址（替换为你的 calldemo 地址）
	contractAddr := common.HexToAddress("0x123...")

	// 3. 创建合约实例
	demoIns, err := NewCalldemo(contractAddr, client)
	if err != nil {
		log.Fatalf("创建合约实例失败: %v", err)
	}

	// 4. 配置 EIP-1559 交易参数
	privateKey := "123"
	chainID := big.NewInt(18) // 与 --networkid 一致

	// 4.1 创建签名者
	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
	if err != nil {
		log.Fatalf("创建签名者失败: %v", err)
	}

	// 4.2 获取最新区块的 baseFeePerGas（用于计算 MaxFee）
	latestBlock, err := client.BlockByNumber(context.Background(), nil)
	if err != nil {
		log.Fatalf("获取最新区块失败: %v", err)
	}
	baseFee := latestBlock.BaseFee() // 对应区块中的 baseFeePerGas: 7

	// 4.3 设置 EIP-1559 参数
	auth.GasLimit = 300000 // 足够的 Gas 限制
	auth.MaxPriorityFeePerGas = big.NewInt(2) // 小费（2 wei，可根据需求提高）
	auth.MaxFeePerGas = new(big.Int).Add(baseFee, auth.MaxPriorityFeePerGas) // 总费用 = baseFee + 小费

	// 5. 调用 SetCount 方法
	tx, err := demoIns.SetCount(auth, big.NewInt(2050))
	if err != nil {
		log.Fatalf("调用 SetCount 失败: %v", err)
	}

	log.Printf("交易已发送: %s", tx.Hash().Hex())
}
