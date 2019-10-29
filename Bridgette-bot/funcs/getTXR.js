module.exports = (channelID, payload, transaction) => {
return{
  to: channelID,
  message: "Transaction info: \n"
    + " ```" + "\n"
    + "  blockHash: " + transaction.blockHash + "\n"
    + "  blockNumber: " + transaction.blockNumber + "\n"
    + "  txHash: " + transaction.transactionHash + "\n"
    + "  transactionIndex: " + transaction.transactionIndex + "\n"
    + "  from: " + transaction.from + "\n"
    + "  to: " + transaction.to + "\n"
    + "  contractAddress: " + transaction.contractAddress + "\n"
    + "  cumulativeGasUsed: " + transaction.cumulativeGasUsed + "\n"
    + "  gasUsed: " + transaction.gasUsed + "\n"
    + "  logs: " + JSON.stringify(transaction.logs)
    + " ```"
  };
};
