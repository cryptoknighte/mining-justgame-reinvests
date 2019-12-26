const TronWeb = require('tronweb')
const Config = require('./config.json')
const util = require('util')

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider(Config.fullNodeProvider);
const solidityNode = new HttpProvider(Config.solidityNode);
const eventServer = Config.eventServer;
const privateKey =  Config.privateKey;

const app = async () => {
    const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
    );

    tronWeb.setDefaultBlock('latest');
    const nodes = await tronWeb.isConnected();
    const connected = !Object.entries(nodes).map(([name, connected]) => {
        if (!connected)
            console.error(`Error: ${name} is not connected`);
        if (connected)
            // console.log("connected ...");

        return connected;
    }).includes(false);

    if (!connected)
        return;

    console.log("CONNECTED to TRON Network!")


    // Connect to contract
    tronWeb.contract().at(Config.primaryContractAddress).then(contract => {
        console.log('Contract has been loaded!');

        // do stuff here
    }).catch(error => {
      console.error("ERROR: " + error)
    });
}

app();
