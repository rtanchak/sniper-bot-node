require("dotenv").config();
const { WebSocketProvider, Contract } = require("ethers");

const blockchain = require("./blockchain.json");

const provider = new WebSocketProvider(process.env.LOCAL_RPC_URL_WS);
const factory = new Contract(
    blockchain.factoryAddress,
    blockchain.factoryAbi,
    provider
);

const init = () => {

    factory.on("PairCreated", (token0, token1, pairAddress) => {
        console.log(
            `
              New pair detected
              =================
              pairAddress: ${pairAddress}
              token0: ${token0}
              token1: ${token1}
            `
        )
    })

}

const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const main = async () => {
    console.log("Trading bot starting .....");
    init();
    while(true) {
      await timeout(3000);
    }
}


main();
