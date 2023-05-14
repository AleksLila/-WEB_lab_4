const http=require('http');
const fs=require('fs');

const server = http.createServer((req, res)=>{
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile( 'index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/') { 
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () =>{
            const formData = new URLSearchParams(body);
            const text = formData.get('text');
            const upperText = (text.match(/[A-Z]/g)).length;
			const lowerCount = (text.match(/[a-z]/g)).length;
            const responseObj = {
                countUpper: upperText,
				countLower: lowerCount
            };
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(responseObj));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end('Page not found');
        }
});

server.listen(3000, ()=> {
    console.log('Server is listening on port 3000');
});
