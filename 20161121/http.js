// 載入 http 的模組
var http = require('http');

var server = http.createServer(function(req, res){
    // req 是本地端請求的訊息
    // res 是主機回傳到本地端的訊息
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World\n');
    res.write('This is a HTTP Server\n');
    var a = 3;
    var b = 3;
    var c =a + b;
    res.write('a+b='+c+'\n');
    if(c>=5){
    res.write('AAA');
    }
    else{
    res.write('BBB');
    }
    res.end();
});

// 監聽 port
server.listen(11325);
console.log('Server running at http://120.125.63.144:11325/');