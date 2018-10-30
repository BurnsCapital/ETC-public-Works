// based on bot made by the ellisiam team
var web3 = require('../common/etherNode');
var botUnits = require('../common/botUnits');
const bot = require('../common/discord');
const log = require('../common/logger');

log.debug('[Bridgette-bot/lib/statebot] statebot loaded');

var faucet = require('../../contracts/build/contracts/faucet.json');
var auth = require('../auth.json')

const ABI = faucet.abi;
const faucetAddr = "0x0189ac60C650e456A660FBAF0E250fDA63fD2905";

const faucetContract = new web3.eth.Contract(ABI, faucetAddr);


module.exports = async (channelID, sender,  args) => {

//*  get a payout *//
  web3.eth.personal.unlockAccount(process.env.BRIDGETTE_ADDRESS, process.env.BRIDGETTE_PW);
  //console.log(args);
  const newDrip = await faucetContract.methods.getETC(args).send({
    from: process.env.BRIDGETTE_ADDRESS,
    gas: '90000',
    gasPrice: '20000000000'
  })
    .then( res => {
      return {
          to: channelID,
          message : '@'+ sender + ', I gave sent you some gas money! You\'re welcome!'
        }
    })
  .catch((err) => {
    return {
      to: channelID,
      message : err
    }
  });
return {
    to: channelID,
    message : '@'+ sender + ', I have sent you some gas money! You\'re welcome!'
  }

}
