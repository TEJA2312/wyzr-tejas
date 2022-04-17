const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var BookApi = require('google-books-search');
const date = require('date-and-time');
require('dotenv').config({ path: './victoria.env' });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// ---------authentication----------
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
var session = require('express-session');
app.use(session({secret: 'keyboard cat', saveUninitialized: true, resave: true, cookie: { secure: false }}));
app.use((req, res, next) => {
  // Check if we've already initialised a session
  if (!req.session.initialised) {
    req.session.initialised = true;
     // Initialise our variables on the session object (that's persisted across requests by the same user
     req.session.userId = '0123';
     req.session.email = '0123'
  }
  next();
});

//-----------------------------------------
const mongoose = require('./models/mongoose');
const User = require('./models/user');
//-----------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
//--------------------------------------------------------




app.post("/api/v1/auth/google", async (req, res) => {
  const { token }  = req.body

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });
  const { name, email, picture, sub } = ticket.getPayload(); 

  let newUser={
    OauthToken: sub,
    firstName: name,
    email:email,
    picture:picture
  };

  User.findOne({OauthToken:sub}).then((docs)=>{
    if(docs){
     res.send('logged');
       } else{
       User.create(newUser,(err,docs)=>{
          res.send('logged');
       });
    }
  });

  req.session.userId = sub;
  req.session.email = email;
  req.session.save();
  console.log(name, email, picture, sub);
});


app.get('/loginStatus', (req, res) =>{
  if(req.session.userId === "0123"){
    let jsonlogout = {
      id: "Not Logged In Yet",
      email: "Not Logged In Yet",
    }
    res.send(jsonlogout);
  }else{
    let jsonlog = {
      id: req.session.userId,
      email: req.session.email,
    }
    res.send(jsonlog);
  }

});

app.get("/api/v1/auth/logout", async (req, res) => {
  await req.session.destroy()
})

app.get('/', (req, res) =>{
  res.send(req.session.userId);
});

app.post('/save', (req, res) =>{
  const now = new Date();
  let finalDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');

  let newHistory={
    serach: req.body.serachTerm,
    timestamp: finalDate
  };
  User.findOneAndUpdate({OauthToken:req.session.userId},{   $push:{ searchHistory: newHistory },}).then((docs)=>{
        res.send('viewed');
        console.log("viewed");
  });


});

app.get('/users-list', (req, res) =>{                 
  User.find({}).then((docs)=>{
    console.log(docs);
    res.send(docs);
  })
});

app.get('/history-list/:useremail', (req, res) =>{                 
  User.findOne({email:req.params.useremail}).then((docs)=>{
    console.log(docs.searchHistory);
    res.send(docs.searchHistory);
  });
});




app.get('/search', (req, res) =>{                 
  res.render('search');
});

app.get('/searchresult/:searchTerm', (req, res) =>{

console.log(req.params.searchTerm); 
BookApi.search(req.params.searchTerm, (error, results)=>{
  if ( ! error ) {
        console.log(results);
        res.send(results);
    } else {
        console.log(error);
        res.send('error');
    }
});
});

app.get('/book/:bookid', (req, res) =>{

  BookApi.lookup(req.params.bookid, function(error, result) {
    if ( ! error ) {
          console.log(result);
          res.send(result);
      } else {
          console.log(error);
          res.send('error');
      }
  });
  
  });

app.listen(process.env.PORT||5000, process.env.IP, function(){
    console.log("BOOK_API SERVER HAS STARTED");
 });