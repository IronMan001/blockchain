// decryptKey.js
function getPrivateKey(keystorePath, password) {
    // 读取 keystore 文件（geth 内部方法）
    const keyJson = JSON.parse(admin.loadJson(keystorePath));
    // 解密私钥
    const privateKeyObj = web3.eth.accounts.decrypt(keyJson, password);
    return privateKeyObj.privateKey;
}

// 替换为你的 keystore 路径和密码
const keystorePath = "/Users/lijiangang/Downloads/ethdev/rungeth/v1.9.10/data/keystore/UTC--2025-07-30T05-43-13.242225000Z--fd08207f18f544d6f98138a6edf5e8e8e80555dd";
const password = "123";

// 执行并打印私钥
console.log("私钥:", getPrivateKey(keystorePath, password));
