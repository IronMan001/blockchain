const { task } = require("hardhat/config");

task("interact-fundme", "与 FundMe 合约交互").addParam("addr","合约地址")
    .setAction(async (taskArgs, hre) => {
        const FundMeFactory = await hre.ethers.getContractFactory("FundMe");
        const fundMe = await FundMeFactory.attach(taskArgs.addr);

        // init 2 accounts
        const [account1, account2] = await ethers.getSigners();
        console.log("account1:", account1.address);
        console.log("account2:", account2.address);
        //call fund function from contract with account1
        const fundTx = await fundMe.connect(account1).fund({value:ethers.parseEther("0.001")});
        await fundTx.wait(1);
        console.log("account1 funded 0.001 eth");
        // check balance of the contract
        const contractBalance = await ethers.provider.getBalance(fundMe.target);
        console.log("contract balance:", ethers.formatEther(contractBalance));
        //call fund function from contract with account2
        const fundTx2 = await fundMe.connect(account2).fund({value:ethers.parseEther("0.002")});
        await fundTx2.wait(1);
        console.log("account2 funded 0.002 eth");
        //check balance of the contract
        const contractBalance2 = await ethers.provider.getBalance(fundMe.target);
        console.log("contract balance:", ethers.formatEther(contractBalance2));
        //check the maping fundersToAmount
        const fundersToAmount = await fundMe.fundersToAmount(account1.address);
        console.log("account1 funded amount:", ethers.formatEther(fundersToAmount));
        const fundersToAmount2 = await fundMe.fundersToAmount(account2.address);
        console.log("account2 funded amount:", ethers.formatEther(fundersToAmount2));
        
    })