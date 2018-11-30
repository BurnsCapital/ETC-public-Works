var BotToken = artifacts.require("./bottoken.sol");
var Watchdog = artifacts.require("./watchdog.sol");

// TEST OWNERS
var botAccount = ['0x12345000000000000000000000000000','0x123456','0x1234567','0x12345678']

var i = {
  '_name'    : 'botToken',
  '_icon'    :'somefile.jpg',
  '_decimals':'0',
  '_owner'   : botAccount[0],
  '_initialSupply' : 100000
}

module.exports = function(deployer) {
  console.log('test migrations activate');
  deployer.deploy(BotToken, i._name, i._icon, i._decimals, i._owner, i._initialSupply);
  deployer.deploy(Watchdog);
};
