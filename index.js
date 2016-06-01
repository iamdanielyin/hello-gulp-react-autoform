/**
 * 服务端模块
 * Created by yinfxs on 16-5-27.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile('./index.html');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('ibird-autoform listening at http://%s:%s', host, port);
});