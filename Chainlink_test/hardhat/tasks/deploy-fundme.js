const { task } = require("hardhat/config");

const SEPOLIA_CHAIN_ID = 11155111; // Sepolia 网络的链 ID
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; // 从环境变量中获取 Etherscan API 密钥
const CONTRACT_CONSTRUCTOR_ARGS = 300; //合约构造函数参数，单位为秒

task("deploy-fundme", "部署 FundMe 合约")
    .setAction(async (taskArgs, hre) => {
        const FundMeFactory = await hre.ethers.getContractFactory("FundMe");
        console.log("合约部署中。。。")
        // 2. 部署合约
        const fundMe = await FundMeFactory.deploy(CONTRACT_CONSTRUCTOR_ARGS); //只是发送交易，没有等待合约部署完成
        // 3. 等待合约部署完成
        // await fundMe.deployed();
        await fundMe.waitForDeployment();
        // 4. 打印合约地址
        console.log(`FundMe 合约部署到地址: ${await fundMe.getAddress()}`);
         if(hre.network.config.chainId === SEPOLIA_CHAIN_ID && ETHERSCAN_API_KEY){
            console.log("Sepolia合约已部署，等待 5 个区块确认");
            await fundMe.deploymentTransaction().wait(5);
            // 5. 验证合约
            await verifyContract(fundMe.target, [CONTRACT_CONSTRUCTOR_ARGS]);
    }else{
        console.log("合约未部署在 Sepolia 网络，无需验证");
    }
    });
async function verifyContract(contractAddress, constructorArguments) {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArguments,
    });
  }