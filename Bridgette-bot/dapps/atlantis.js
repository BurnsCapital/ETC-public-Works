//atlantis fork block

// 14 sec blocks

// 

function  getMsg( forkName, forkBlk, blocknumber ) {
    var now = new Date().getTime();
    var timeRemains = (forkBlk - blocknumber) * 14;
    var countDownDate = ( timeRemains * 1000 )  + 604800 + new Date().getTime();
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor( distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor( ( distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if(distance > 0){
    var response = [
        "The " + forkName +" update will happen in " + (forkBlk - blocknumber) + " blocks.",
        "In about " + days + " days," + hours +" hours, " + minutes + " mins and " + seconds + " seconds",
        "" + days + " days," + hours +" hours, " + minutes + " mins and " + seconds + " seconds",
        "The  " + forkName + " fork will be in " + days + " days," + hours +" hours, " + minutes + " mins and " + seconds + " seconds" 
	];
    return response[Math.floor(Math.random() * response.length)];
    } else {
	return ""+ forkName + " is here!!!!";
}
}


module.exports = (channelID, forkName, forkBlk, blockNumber) => {
return{
  to: channelID,
  message : getMsg( forkName, forkBlk, blockNumber )
  };
};
