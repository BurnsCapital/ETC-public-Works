var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WEB3_URL));
//ar web3 = new Web3(new Web3.providers.WebsocketProvider('http://10.0.0.130'));

var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + 'index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// emit an event on new blockheader
web3.eth.subscribe('newBlockHeaders', function(err,result){
    io.emit('newBlock', { currentBlk : result.number });
    console.log(result.number);
});


app.listen(3000);
