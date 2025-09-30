// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat");
const SEPOLIA_CHAIN_ID = 11155111; // Sepolia 网络的链 ID
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; // 从环境变量中获取 Etherscan API 密钥
const CONTRACT_CONSTRUCTOR_ARGS = 180; //合约构造函数参数，单位为秒

async function main (){
    // 1. 获取合约工厂
    const FundMeFactory = await ethers.getContractFactory("FundMe");
    console.log("合约部署中。。。")
    // 2. 部署合约
    const fundMe = await FundMeFactory.deploy(CONTRACT_CONSTRUCTOR_ARGS); //只是发送交易，没有等待合约部署完成
    // 3. 等待合约部署完成
    // await fundMe.deployed();
    await fundMe.waitForDeployment();
    // 4. 打印合约地址
    console.log("FundMe deployed to:", fundMe.target);
    
    if(hre.network.config.chainId === SEPOLIA_CHAIN_ID && ETHERSCAN_API_KEY){
        console.log("Sepolia合约已部署，等待 5 个区块确认");
        await fundMe.deploymentTransaction().wait(5);
        // 5. 验证合约
        await verifyContract(fundMe.target, [CONTRACT_CONSTRUCTOR_ARGS]);
    }else{
        console.log("合约未部署在 Sepolia 网络，无需验证");
    }
    
    // init 2 accounts
    const [account1, account2] = await ethers.getSigners();
    console.log("account1:", account1.address);
    console.log("account2:", account2.address);
    //call fund function from contract with account1
    const fundTx = await fundMe.connect(account1).fund({value:ethers.parseEther("0.01")});
    await fundTx.wait(1);
    console.log("account1 funded 0.01 eth");
    // check balance of the contract
    const contractBalance = await ethers.provider.getBalance(fundMe.target);
    console.log("contract balance:", ethers.formatEther(contractBalance));
    //call fund function from contract with account2
    const fundTx2 = await fundMe.connect(account2).fund({value:ethers.parseEther("0.02")});
    await fundTx2.wait(1);
    console.log("account2 funded 0.02 eth");
    //check balance of the contract
    const contractBalance2 = await ethers.provider.getBalance(fundMe.target);
    console.log("contract balance:", ethers.formatEther(contractBalance2));
    //check the maping fundersToAmount
    const fundersToAmount = await fundMe.fundersToAmount(account1.address);
    console.log("account1 funded amount:", ethers.formatEther(fundersToAmount));
    const fundersToAmount2 = await fundMe.fundersToAmount(account2.address);
    console.log("account2 funded amount:", ethers.formatEther(fundersToAmount2));


}

async function verifyContract(contractAddress, constructorArguments) {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArguments,
    });
  }


main().then(() => process.exit(0)).catch(error => {
    console.error(error.message);
    process.exit(1);
});