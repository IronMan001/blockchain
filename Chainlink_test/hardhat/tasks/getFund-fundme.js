const { task } = require("hardhat/config");

//提取余额
task("getFund-fundme", "提取 FundMe 合约的余额")
    .addParam("addr","合约地址")
    .setAction(async (taskArgs, hre) => {
        const fundMe = await hre.ethers.getContractAt("FundMe", taskArgs.addr);
        const contractBalance = await ethers.provider.getBalance(fundMe.target);
        console.log("contract balance:", ethers.formatEther(contractBalance));

        //get account1 and account2 from hardhat
        const [account1, account2] = await hre.ethers.getSigners();
        console.log("account1:", account1.address);
        console.log("account2:", account2.address);

        //check the maping fundersToAmount
        const fundersToAmount = await fundMe.fundersToAmount(account1.address);
        console.log("account1 funded amount:", ethers.formatEther(fundersToAmount));
        const fundersToAmount2 = await fundMe.fundersToAmount(account2.address);
        console.log("account2 funded amount:", ethers.formatEther(fundersToAmount2));

        console.log("把全部款项提到 account1")
        //call getFund function from contract with account1
        const getFundTx = await fundMe.connect(account1).getFund();
        await getFundTx.wait(1);
        console.log("account1 getFund "+fundersToAmount+" eth");
        //check balance of the contract
        const contractBalance2 = await ethers.provider.getBalance(fundMe.target);
        console.log("contract balance:", ethers.formatEther(contractBalance2));
        //check balance of account1
        const account1Balance = await ethers.provider.getBalance(account1.address);
        console.log("account1 balance:", ethers.formatEther(account1Balance));
    });
