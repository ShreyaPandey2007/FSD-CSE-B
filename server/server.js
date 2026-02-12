import http from 'http';
import { arch } from 'os';
import os,{freemem,platform} from 'os';
const server = http.createServer((req, res) => {
    const url=req.url;
     let body="";
     let data=[];
    if(url==='/'&& req.method=="GET"){
        res.end('Home Page');
    }
    else if(url==='/about' && req.method=="GET"){
        res.end('About Page');
    }
    else if(url==='/contact' && req.method=="GET"){
        res.end('Contact Page');
    }
    else if(url==='/senddata' && req.method=="POST"){
       
        req.on('data',(chunk)=>{
            body+=chunk;
        });
        req.on('end',()=>{
            console.log('Received data:',body);
            data.push(body);
            res.end(body+'Data received successfully');
           
        });
    }
    else if(url==="/system" && req.method=="GET"){
        const systemInfo={
            platform:os.platform(),
            arch:os.arch(),
            cpu:os.cpuUsage().length,
            totalRam:(os.totalmem()/1024**3).toFixed(2)+"GB",
            freemem:(os.freemem()/1024**3).toFixed(2)+"GB"
        }
        res.setHeader("Content-Type","application/json"),
        res.end(JSON.stringify(sysdata))

    }
    else{
        res.statusCode=404;
        res.end('Page Not Found');
    }

});
server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});