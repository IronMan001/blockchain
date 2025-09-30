require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
// require("dotenv").config();
require("@chainlink/env-enc").config();

require("./tasks")

const { SEPOLIA_URL, PRIVATE_KEY_ACCOUNT1,ETHERSCAN_API_KEY, PRIVATE_KEY_ACCOUNT2 } = process.env;

//代理工具必须开启 TUN 模式，否则不生效
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:7897");
setGlobalDispatcher(proxyAgent);


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
      url:SEPOLIA_URL,
      accounts:[
        PRIVATE_KEY_ACCOUNT1,
        PRIVATE_KEY_ACCOUNT2
      ],  
      chainId:11155111
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
    // customChains: [
    //   {
    //     network: "sepolia",
    //     chainId: 11155111,
    //     urls: {
    //       etherscan: "https://api.etherscan.io/v2/api" // Sepolia 专用 API 端点
    //     }
    //   }
    // ]
    // timeout: 60000, // Increase timeout to 60 seconds
    // gasPrice: 1000000000
  }
  // sourcify: {
    // Disabled by default
    // Doesn't need an API key
  //   enabled: true
  // },
    // Optional: Add custom HTTP request options
  // httpHeadersTimeout: 60000
};