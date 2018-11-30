//var Web3 = require('web3');
const log = require('../logger')

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WEB3_URL, 5000));
var contract = require('../../contracts/build/contracts/watchdog.json');
const ABI = contract.abi;
const ADDR = process.env.WD_CONTRACT;
const wd = new web3.eth.Contract(ABI, ADDR);

log.info('[Heimdall/webhooks/watchman] Watchman module loaded');

module.exports = {
  sendLog: async (fn) => {
    let body = ctx.request.body;

    //unlock the account and send the transaction
     await web3.eth.personal.unlockAccount(process.env.BRIDGETTE_ADDRESS, process.env.BRIDGETTE_PW)
     .catch( err => {
      log.error('[Heimdall/webhooks/watchman] unlock account error: '+ err);
     });

     //console.log('acct unlocked');
     let gas = await wd.methods.addEvent(body).estimateGas({from: process.env.BRIDGETTE_ADDRESS})
     .catch( err => {
      log.error('[Heimdall/webhooks/watchman] transfer estimate error: '+ err);
     });
     //send the log message
     let msg = await wd.methods.addEvent(body).send({
       from: process.env.BRIDGETTE_ADDRESS,
       gas: Math.round(gas * 1.5),
       gasPrice: '50000000000'
     })
     .then(async function(receipt){
       fn(receipt);
       log.debug('[Heimdall/webhooks/watchman] transfer receipt: '+ receipt);
       })
      .catch(function(err){
        fn(receipt);
        log.error('[Heimdall/webhooks/watchman] transfer error ' + err);
      });
    }   //end sendlog

};
