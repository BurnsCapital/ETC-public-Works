const Watchdog = artifacts.require("watchdog");

const err =require('./exceptions');

var e = [{name: "an event"}];

contract('Watchdog test', async (accounts) => {
  it("should do nothing if the owner isnt correct", async () => {
     let instance = await Watchdog.deployed();
     let goodGuy = accounts[0];
     let trigger =  await instance.addEvent(e.toString(), {from: goodGuy});
     assert.equal(trigger, e.toString());
  });

  it("should do nothing if the owner isnt correct", async () => {
     let instance = await Watchdog.deployed();
     let badGuy = accounts[1];
     await err.tryCatch(instance.addEvent(e.toString(), {from: badGuy}), err.errTypes.revert);
  });
})
