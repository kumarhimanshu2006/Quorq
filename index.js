let express=require('express');
const path = require('path');
const {v4:uuidv4}=require('uuid');
const methodOverride=require('method-override')
let app=express();
let port= 3000;

require('path')
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine',"ejs");
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));

let posts=[
    {   
        id:uuidv4(),
        username:"monu",
        content:"do something"
    },
    {   
        id:uuidv4(),
        username:"Himanshu",
        content:"work hard"
    }  
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts} );
   })
app.get("/posts/new",(req,res)=>{
   res.render("new.ejs");
})
app.get("/posts/:id/edit",(req,res)=>{
   let {id}= req.params
    let post = posts.find((p)=> p.id == id);
    res.render('edit.ejs',{post});
}) 

app.post("/posts",(req,res)=>{
    let count=uuidv4();
    let {username,content}=req.body;
    posts.push({id:count, username,content})
    res.redirect("/posts");
})
app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;

    let post = posts.find((p)=> p.id == id);

    post.content = newContent;

    res.redirect('/posts')
});
   app.delete('/posts/:id',(req,res)=>{
      let {id}= req.params;
      posts= posts.filter((p)=>p.id != id);
      res.redirect("/posts")
   });
   app.get("/posts/:id",(req,res)=>{
   let {id}= req.params;
   let post= posts.find((p)=>p.id == id);
    res.render("show.ejs",{post})
   })
   
app.listen(port,()=>{
    console.log(`Listening at port no${port}`)
})