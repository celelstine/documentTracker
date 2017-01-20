

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const  app = express();
const firebase = require("firebase");

var config = {
            apiKey: "AIzaSyBQ2swuVnEBW4PHKGNXYKLs6ussitWlDTk",
            authDomain: "trackdoc-ad797.firebaseapp.com",
            databaseURL: "https://trackdoc-ad797.firebaseio.com",
            storageBucket: "trackdoc-ad797.appspot.com",
            messagingSenderId: "178755390087"
          };
firebase.initializeApp(config);

//route setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'routes')));
app.use(bodyParser.urlencoded({ extended: true })); 

// session setup
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
// must use cookieParser before expressSession
app.use(cookieParser());

app.use(expressSession({secret:'smilesh2o24Andela'}));


//reponse to get from root url
app.get('/', (req, res) => {
   if( req.session.uid) {
      res.sendFile(__dirname + '/views/index.html');
    
    } else{
      res.redirect('/login');
    }
 })

app.get('/route/index.js', (req, res) => {
   if( req.session.uid) {
      res.sendFile(__dirname + '/routes/index.js');
    
    } else{
      res.redirect('/login');
    }
 })


app.get('/signup',function(req,res){
   res.sendFile(__dirname + '/views/signup.html');
});



app.post('/signup',function(req,res) {
  var email=req.body.email,
      password=req.body.password,
      fname=req.body.fname,
      lname=req.body.lname,
      name = fname + ' ' + lname,
      bio=req.body.bio,
      errorCode,
      errorMessage,
      userid;

      console.log(password);

      // creating a user
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){

          firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {

            //login the user#
            userid = firebase.auth().currentUser.uid;
            req.session.uid = userid; 

            // insert user into db
            var userRef = firebase.database().ref('trackdoc/user');
            var newuser = {
              "bio" : bio,
              "email" : email,
              "name" : fname ,
              "id" : userid
            } 

            userRef.push(newuser).then(function(user) {
                res.redirect('/');
              }). catch(function(error) {
                console.error('Sign in Error', error);
                res.redirect('/signout');
               });

          })
          .catch(function(error) {
            // Handle Errors here.
             errorCode = error.code;
             errorMessage = error.message;
             console.log('errorCode = ' + errorCode + ', errorMessage= ' + errorMessage);
             res.redirect('/login');
            // ...
          });
      }).catch(function(error) {
          console.log('there was an error');
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + ' - ' + errorMessage);
      });

 })

app.get('/signout',function(req,res){

  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    req.session.uid = null;
    res.redirect('/login');
  }).catch(function(error) {
    console.error('Sign Out Error', error);
  })


});
app.get('/login',function(req,res){
   res.sendFile(__dirname + '/views/login.html');
});

app.get('/gSign',function(req,res){ 

   var provider = new firebase.auth.GoogleAuthProvider();
   firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      userid = firebase.auth().currentUser.uid;
      require.session.uid = userid; 
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    
      console.log(error.code)
      console.log(error.message)
   });
});

app.post('/login',function(req,res){
  var email=req.body.email;
  var password=req.body.password;
  var errorCode;
  var errorMessage;
  var userid;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    userid = firebase.auth().currentUser.uid;
    req.session.uid = userid;
     if(req.session.uid){
      console.log(userid);
    
     res.redirect('/');
  } else {
    console.log("fail");
     res.redirect('/login');
  }

  }).catch(function(error) {
    // Handle Errors here.
     errorCode = error.code;
     errorMessage = error.message;
     console.log('errorCode = ' + errorCode + ', errorMessage= ' + errorMessage);
     res.redirect('/login');
    // ...
  });
 
});

app.get('/signout',function(req,res){

  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    req.session.uid = null;
    res.redirect('/login');
  }).catch(function(error) {
    console.error('Sign Out Error', error);
  })


});

app.get('/share', (req, res) => {

    if( req.session.uid) {
      res.sendFile(__dirname + '/views/share.html');
    
    } else{
      res.redirect('/login');
    }
 })

app.get('/search', (req, res) => {

    if( req.session.uid) {
      res.sendFile(__dirname + '/views/search.html');
    
    } else{
      res.redirect('/login');
    }
 })

// response to post from url = /quotes
app.post('/share', (req, res) => {

      var uploadUrl = req.body.docurl,
        keywords = req.body.keywords,
        title = req.body.title,
        dept = '',
        deptStart=0;

      // get the department

      if ( req.body.key1) { 
        if(deptStart == 0) { dept = req.body.key1.toString();}
        else {  dept += ',' + req.body.key1.toString();}
        deptStart++;
      }
      if ( req.body.key2) { 
        if(deptStart == 0) { dept = req.body.key2.toString();}
        else {  dept += ',' + req.body.key2.toString();}
        deptStart++;
      }
      if ( req.body.key3) { 
        if(deptStart == 0) { dept = req.body.key3.toString();}
        else {  dept += ',' + req.body.key3.toString();}
        deptStart++;
      }
      if ( req.body.key4) { 
        if(deptStart == 0) { dept = req.body.key4.toString();}
        else {  dept += ',' + req.body.key4.toString();}
        deptStart++;
      }
      if ( req.body.key5) { 
        if(deptStart == 0) { dept = req.body.key5.toString();}
        else {  dept += ',' + req.body.key5.toString();}
        deptStart++;
      }
      if ( req.body.key6) { 
        if(deptStart == 0) { dept = req.body.key6.toString();}
        else {  dept += ',' + req.body.key6.toString();}
        deptStart++;
      }
      if ( req.body.key7) { 
        if(deptStart == 0) { dept = req.body.key7.toString();}
        else {  dept += ',' + req.body.key7.toString();}
        deptStart++;
      }

       //check if no dept was selected

       if( dept == '') {
        console.log('no department');
         // document.getElementById('result').innerHTML = 'you must select at least one department';
       } else {

        //push share
        var date = new Date().toDateString(),
          uid = req.session.uid,
          //firebase database
          shareRef = firebase.database().ref('trackdoc/shared');

          ////////////
          // get the username from the db
      var userRef = firebase.database().ref('trackdoc/user');
      userRef.on('value',function(snapshot) {
         var users = snapshot.val();
         //console.log(curShare.sharedBy);
        
        for( key in users ) {
      
          var curUser = users[key];
         console.log(curUser);

          if ( curUser.id == uid ) {
            //console.log(curUser.uid + '3' + uid);
            curusername1 = curUser.fname + '  ' + curUser.lname;
            //lazy load
            var  newshare = {
                  "dateReg" : date,
                    "departments" : dept,
                    "uid" : uid,
                    "tags" : keywords,
                    "title" : title,
                    "url" : uploadUrl,
                    "sharedBy": curusername1
                };
              console.log(newshare);
              shareRef.push(newshare).then(function(user) {
                res.redirect('/');
              }). catch(function(error) {
                console.error('Sign Out Error', error);
                res.redirect('/share');
               });

            break;

          }
        }
                  
      })  

          /////////////////
        

      }
       //console.log("test");
       //res.redirect('/login');

  })


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),function() {
    console.log('Document Tracker running.');
});
