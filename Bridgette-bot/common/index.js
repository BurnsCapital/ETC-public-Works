// capture all common connections

var botUnits = require( './botUnits' );
var bot = require( './discord' );
var log = require( './logger' );
var web3 = require( "./etherNode" ); 
var watson = require( './watson' );


module.exports = {
    botUnits = botUnits,
    bot  = discord,
    log  = logger,
    web3 = web3,
    watson = watson,
}

