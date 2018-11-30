const Router = require('koa-router');
//const database = require('./database');
//const blockchain = require('./dlt/core');
const watchman = require('./webhooks/watchman');
const cache = require('./cache');
var bodyParser = require('koa-body')();

//const joi = require('joi');
//const validate = require('koa-joi-validate');

const router = new Router();


// redis cache manager
// Check cache before continuing to any endpoint handlers
//router.use(cache.checkResponseCache)
// Insert response into cache once handlers have finished
//router.use(cache.addResponseToCache)

//joi validate
/* Check that id param is valid number
const idValidator = validate({
  params: { id: joi.number().min(0).max(1000).required() }
})
// Check that query param is valid location type
const typeValidator = validate({
  params: { type: joi.string().valid(['castle', 'city', 'town', 'ruin', 'landmark', 'region']).required() }
})
*/

////////////////////////////////////////////////////////////////
// routes
////////////////////////////////////////////////////////////
// Hello World Test Endpoint

function setCTX(ctx, res){
	ctx.body = res;
	}

router.get('/Heimdall', async ctx => {
  ctx.body = 'Heimdall is online';
});

/* Get latest block from DB
router.get('/blockchain/getBlockNumber', async ctx => {
	return new Promise(function(resolve, reject){
	 blockchain.getBlockNumber(function(result){
		ctx.body = result;
		resolve();
	    });
	});
})
*/
//log a webhook hit
router.post('/watchdog', bodyParser, async ctx => {
	return new Promise(function(resolve, reject){
		watchman.sendLog(function(result){
			ctx.body = result;
			resolve();
		});
	});
})



module.exports = router;
