const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended:true})

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(urlencodedParser);

const Sequelize=require('sequelize');
const connect=new Sequelize('demo_db','postgres','root',{
  host: 'localhost',
  dialect:'postgres',
  operatorsAliases:true
});

var User = connect.define('auth', {
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

User.sync();

app.post('/api/users/insert',(req,res) => {
  console.log(req.body);
  User.create({
    email: req.body.email,
    password: req.body.password
  }).then(users => res.send(users))
});

app.post('/api/auth/login',(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;

  if(email=="demo@demo.com" && password=="123456789"){
    res.send("Login successfull");
  }
  else{
    res.send("Failed");
  }
});

app.get('/api/demo',(req,res)=>{
  res.send("Halo world...")
});

app.listen("8000");
console.log("Server running...");
