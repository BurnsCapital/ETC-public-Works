/* Web3 information
var Web3 = require('web3');
const log = require('../logger')

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WEB3_URL, 5000));
log.info('Web3 connection established');

module.exports = {
  uery the current time
  getBlockNumber: async (fn) => {
    web3.eth.getBlockNumber(function(err,res){
      log.error('getBlockNumber: ' + err);
      log.debug('blocknumber: ' + res);
      fn(res);
    });
  }
};
*/
