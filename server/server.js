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
    if(url==='/users'&& method=="GET"){
        res.end(JSON.stringify(userdata));
    }
    

    if(url.startsWith('/users/') && method=="GET"){
       const id=url.split('/')[2];
       const data=userdata.find(user=>user.id==id);
       if(data){
           res.end(JSON.stringify(data));
       } else {
           res.statusCode=400;
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
    if(url.startsWith('/users/') && method=="PUT"){
       const id=url.split('/')[2];
       const data=userdata.findIndex(user=>user.id==id);
       if(data==-1){
        res.statusCode=404;
        return res.end('User Not Found');
       }
       else{
        let body="";
        req.on("data",(chunk)=>{
            body+=chunk.toString();
        })
        req.on("end",()=>{
            const updatedData=JSON.parse(body);
            userdata[data]={...userdata[data],...updatedData};
            res.end(JSON.stringify(userdata[data]));
       })
    }}
    if(url==="/createuser" && method=="POST"){
       let body="";
       req.on("data",(chunk)=>{
           body+=chunk.toString();
       })
       req.on("end",()=>{
           const data=JSON.parse(body);
           if(!data.name || !data.email){
               res.statusCode=400;
               return res.end('Name and Email are required');
           }
           const newUser={
            id:Date.now().toString(),
            name:data.name,
            email:data.email
           };
           
           userdata.push(newUser);
           res.end(JSON.stringify(newUser));
       })
    }

    else{
        res.statusCode=404;
        res.end('Not Found');
    }  
});
server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});