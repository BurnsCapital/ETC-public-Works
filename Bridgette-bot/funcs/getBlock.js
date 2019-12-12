const { log, web3 } = require('../common');

module.exports = (channelID, funcs, rawBlk) => {

  //transactions = rawBlk.transactions.length;

return{
  to: channelID,
  message : "```"
  + "Block number :" + rawBlk.number + "\n"
  + "hash : " + rawBlk.hash + "\n"
  + "parentHash : " + rawBlk.parentHash + "\n"
  + "nonce : " + rawBlk.nonce + "\n"
  + "sha3Uncles : " + rawBlk.sha3Uncles + "\n"
  + "logsBloom : " + rawBlk.logsBloom + "\n"
  + "transactionsRoot : " + rawBlk.transactionsRoot + "\n"
  + "stateRoot : " + rawBlk.stateRoot + "\n"
  + "miner : " + rawBlk.miner + "\n"
  + "difficulty : " + rawBlk.difficulty + "\n"
  + "totalDifficulty : " + rawBlk.totalDifficulty + "\n"
  + "size : " + rawBlk.size + "\n"
  + "extraData : " + web3.utils.toAscii(rawBlk.extraData) + "\n"
  + "gasLimit : " + rawBlk.gasLimit + "\n"
  + "gasUsed : " + rawBlk.gasUsed + "\n"
  + "timestamp : " + rawBlk.timestamp + "\n"
  + "Number of Transactions : " + rawBlk.transactions.length+ "\n"
  + "Number of Uncles : " + rawBlk.uncles.length
  + "```"
  };
};
