import http from 'http';
import os from 'os';
const userdata=[];
const server = http.createServer((req, res) => {
    const url=req.url;
    const method=req.method;
    if(url==='/'&& method=="GET"){
        res.end('Home Page');
    }
    if(url==='/contact'&& method=="GET"){
        res.end('Contact Page');
    }
    if(url==='/system'&& method=="GET"){
        const sysinfo={
            platform:os.platform(),
            arch:os.arch(),
            cpu:os.cpus(),
            totalRam:(os.totalmem()/1024**3).toFixed(2)+"GB",
            freeRam:(os.freemem()/1024**3).toFixed(2)+"GB"

        }
        res.setHeader("Content-Type","application/json");
        res.write(JSON.stringify(sysinfo));
        res.end();
    }
    if(url==='/senddata'&& method=="POST"){
        
        let body="";
        req.on("data",(chunk)=>{
            body+=chunk.toString();
        })
        req.on("end",()=>{
            res.statusCode=201;
            userdata.push(body);
            res.end(userdata.toString());
        })
    }
    if(url==="/viewdata" && method=="GET"){
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify(userdata));
    }
})
server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});