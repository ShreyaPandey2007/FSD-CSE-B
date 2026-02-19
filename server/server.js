import http from 'http';
const userdata=[{
    id:"1",
    name:"John Doe",
    email:"abc@gmail.com"
},{id:"2",name:"Jane Smith",email:"jane@gmail.com"},
{id:"3",name:"Bob Johnson",email:"bob@gmail.com"}];
const server = http.createServer((req, res) => {
    const url=req.url;  
    const method=req.method;
    if(url==='/'&& method=="GET"){
        res.end('Home Page');
    }
    if(url==='/users'&& method=="GET"){
        res.end(JSON.stringify(userdata));
    }

    if(url.startsWith('/users/') && method=="GET"){
       const id=url.split('/')[2];
       const data=userdata.find(user=>user.id==id);
       if(data){
           res.end(JSON.stringify(data));
       } else {
           res.statusCode=404;
          return res.end('User Not Found');
       }
    }
    if(url.startsWith('/users/') && method=="DELETE"){
       const id=url.split('/')[2];
       const data=userdata.findIndex(user=>user.id==id);
       if(data>-1){
           userdata.splice(data,1);
         res.end('User Deleted Successfully');
       } else {
           res.statusCode=404;
          return res.end('User Not Found');
       }
    }
    else{
        res.statusCode=404;
        res.end('Not Found');
    }  
});
server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});