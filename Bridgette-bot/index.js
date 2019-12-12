const { bot, log, web3 } = require('./common');

// Initialize Discord Bot

bot.on('ready', function (evt) {
    log.info('[Bridgett-bot/index.js] Connected');
    log.info('[Bridgett-bot/index.js] Logged in as: ');
    log.info('[Bridgett-bot/index.js]' + bot.username + ' - (' + bot.id + ')');
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//* Get functions from library *//

const { getBlockNumber, getBalance, getTransaction, getTXR, sendSignedTransaction, getGasPrice, getBlock, version, error, forkName } = require( "./funcs" );

// dapps

const { statebot, multi, donate, getetc, etcmail, eventLog, tipper, atlantis } = require( "./dapps" );

// help files

const { bridgette, donatehelp, etcmailhelp, tipperError } = require( "./help" );

//* end functoin set*//

function addReaction(channelID, evt,emoji){
   bot.addReaction({
    channelID : channelID,
    messageID : evt.d.id,
    reaction : emoji
  })
}

bot.on('message', async function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0].toLowerCase();
        var payload = args[1];
        if (args[2] != null){
        var dLoad = [args[1].toLowerCase(), args[2], args[3]];
      }
        args = args.splice(1);
        switch(cmd) {
            case 'web3':
                bot.sendMessage(bridgette(channelID));
              break;

            // getBlockNumber
            case 'getblocknumber':
              web3.eth.getBlockNumber()
              .then(blockNumber => {
                bot.sendMessage(getBlockNumber(channelID, blockNumber));
                  }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            break;

            // version
            case 'version':
              bot.sendMessage(version(channelID));
            break;
            
            // forkname     
            case 'fork':
              bot.sendMessage(forkName(channelID, payload));
            break;
            
            // getBalance
            case 'getbalance':
             if(payload != undefined && web3.utils.isAddress(payload)){
              web3.eth.getBalance(payload)
              .then( balance => {
                bot.sendMessage(getBalance(channelID, payload, balance));
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Get balance requires an account number (i.e. !getBalance <0xaccount>)"
              });
            }
            break;

            // getTransaction
            case 'gettransaction':
             if(payload != undefined){
              web3.eth.getTransaction(payload).then(
              transaction => {
                bot.sendMessage(getTransaction(channelID, payload, transaction));
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Get transaction requires a txId (i.e. !getTransaction <txId>)"
              });
            }
            break;

            //get transactionReceipt

           case 'inspect':
             if(payload != undefined){
              web3.eth.getTransactionReceipt(payload).then(
              transaction => {
                bot.sendMessage(getTXR(channelID, payload, transaction));
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Get transaction receipt requires a txId (i.e. !getTransaction <txId>)"
              });
            }
            break;

            // sendSignedTransaction
            case 'sendsignedtransaction':
             if(payload != undefined){
              web3.eth.sendSignedTransaction(payload)
              .then( hash => {
                bot.sendMessage(sendSignedTransaction(channelID, hash))
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Send Raw Tx requires a signed transaction (i.e. !sendRawTransaction <0xdeadbeef>)"
              });
            }
            break;

            // gasPrice
            case 'gasprice' :
            web3.eth.getGasPrice()
            .then(gas => {
              bot.sendMessage(getGasPrice(channelID, gas))
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            break;

            // getBlock
            case 'getblock':
             addReaction(channelID, evt, "\u{1F916}");
             if(payload != undefined){
              var funcs = args[2];
              web3.eth.getBlock(payload)
              .then( rawBlk => {
                bot.sendMessage(getBlock(channelID, funcs, rawBlk))
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
              } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Get transaction requires a txId (i.e. !getTransaction <txId>)"
              });
            }

            break;

            case 'query':
             if(payload != undefined && isNumber(payload)){
              if(web3.utils.isAddress(payload)){
              web3.eth.getBalance(payload)
              .then( balance => {
                bot.sendMessage(getBalance(channelID, payload, balance));
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            } else if (payload.length == 66 ){
              web3.eth.getTransaction(payload).then(
              transaction => {
                bot.sendMessage(getTransaction(channelID, payload, transaction));
              })
            } else if (payload.length <= 9) {
              web3.eth.getBlock(payload)
              .then( rawBlk => {
                bot.sendMessage(getBlock(channelID, funcs, rawBlk))
              })
              .catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Query requires a payload of txId, or account, block number, or something (i.e. !query <something>)"
              });
            }
          } else {
            bot.sendMessage({
                to: channelID,
                message: "Query requires a payload of txId, or account, block number, or something (i.e. !query <something>)"
            });
          };
            break;

//* dapps *//
            case 'atlantis':
              web3.eth.getBlockNumber()
              .then(blockNumber => {
                bot.sendMessage(atlantis(channelID, "Atlantis", 8772000, blockNumber));
                  }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            break;

        case 'agharta':
              web3.eth.getBlockNumber()
              .then(blockNumber => {
                bot.sendMessage(atlantis(channelID, "Agharta", 9573000, blockNumber));
                  }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            break;

       case 'ecip1017':
              web3.eth.getBlockNumber()
              .then(blockNumber => {
                bot.sendMessage(atlantis(channelID, "ECIP1017", 10000000, blockNumber));
                  }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            break;

            case 'statebot':
            statebot.methods.currentAddr().call()
            .then( ca => {
              bot.sendMessage({
              to: channelID,
              message :  "The most current state dump is located at http://ipfs.io/ipfs/" +ca
              });
            });
            break;

            case 'community':
              if(payload != undefined){
                switch(payload) {
                  case 'address':
                    bot.sendMessage({
                      to: channelID,
                      message :  "The community multisig is located at: `" + multi.options.address + "`"
                    });
                    break;
                  case 'balance':
                  web3.eth.getBalance(multi.options.address)
                    .then (res => {
                      bot.sendMessage(getBalance(channelID, "Community Multisig", res))
                      });
                    break;
                    }
                } else {
                  bot.sendMessage({
                  to: channelID,
                  message :  "Please use either `!community balance` or `!community address`"
                  });
                }
              break;
            case 'donate' :
              if(payload != undefined){
                bot.sendMessage({
                to: channelID,
                message :  'Creating a contract with ' + dLoad[2] +' as the owner giving ' + dLoad[1] +'% of anything donated to '+ dLoad[0] + '.'
              });
                bot.sendMessage(await donate(channelID, user,dLoad))
              } else {
                bot.sendMessage(donatehelp(channelID));
              }
              break;

            case 'getetc' :
              if(payload != undefined && web3.utils.isAddress(payload)){
                  bot.sendMessage({
                  to: channelID,
                  message :  'Ok, I\'ll see if I can send some gas money.'
                });
                  bot.sendMessage(await getetc(channelID, user, payload))
                } else {
                  bot.sendMessage({
                  to: channelID,
                  message :  "Sorry" + user + " try again with an address!"
                  });
                }
                break;

            case 'mail' :
              if(payload != undefined){
                addReaction(channelID, evt, "\u{1F916}");
                bot.sendMessage(await etcmail(channelID, user, args)
              .catch((err) => {
                addReaction(channelID, evt, "⛔");
                console.error(err)}));
              } else {
                bot.sendMessage(etcmailhelp(channelID));
              }
            break;

          case 'tipper' :
          if(payload != undefined){
          await tipper(channelID, user, userID, args, evt)
          } else {
            addReaction(channelID, evt, "⚠️");
            bot.sendMessage(tipperError(channelID));
          }
         break;

          case 'events' :
              bot.sendMessage(await eventLog(channelID, user, payload));
            break;

          }
     }
});

module.exports.bot = bot;
