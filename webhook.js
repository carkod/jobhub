var secret = "48295620-J";
var repo = "/var/www/carloswu.xyz";
const appName = "jobhub"
let http = require('http');
let crypto = require('crypto');

const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == secret) {
            exec('cd ' + repo + '&& git reset --hard && git pull origin master && npm run build && pm2 restart');
        }
    });

    res.end();
}).listen(8081);
