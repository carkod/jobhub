let http = require('http');
let crypto = require('crypto');
const dotenv = require('dotenv')

dotenv.config()

var secret = process.env.JWT_SECRET;
var repo = "/var/www/carloswu.xyz";
const appName = "jobhub"

const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] === sig) {
            console.log('executing git commands in server...')
            exec('cd ' + repo + '&& git reset --hard && git pull origin master && npm run prod && pm2 restart ' + appName);
        }
    });

    res.end();
}).listen(7000);
