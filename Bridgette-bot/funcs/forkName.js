const { log } = require('../common');
const wl = require('../common/wordlist.json');
log.info('[dflow/controllers/forkname.js] forkname loaded');

//provide a random response

function getResponse(bn1, bn2){

    var responses = [
        `That fork would be known as: ${wl[bn1]} ${wl[bn2]}`
    ]
    log.debug('[dflow/controllers/forkname.js] possible responses: ' + responses); 
    return responses[Math.floor(Math.random() * responses.length)]; 
}

function reverseNumber(n){
	n = n + "";
	return n.split("").reverse().join("");
}


module.exports = (channelID, blocknumber) =>{
    let bn1= blocknumber % 2048;
    let bn2= reverseNumber(blocknumber) % 2048;
    return {
      to: channelID,
      message: getResponse(bn1,bn2)
    };
}; 
