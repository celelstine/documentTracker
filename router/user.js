/**
var ref = new Firebase("firebase.js");

// callback function to authenticate user 
var authClient = new FirebaseAuthClient(ref, function(error, user) {
  if (error) {
    alert(error);
    return;
  }
  if (user) {
    // User is already logged in.
    doLogin(user);
  } else {
    // User is logged out.
    showLoginBox();
  }
});

// signup
function showLoginBox() {
  // Do whatever DOM operations you need to show the login/registration box.
  $("#registerButton").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    authClient.createUser(email, password, function(error,  user) {
      if (!error) {
        doLogin(user);
      } else {
        alert(error);
      }
    });
  });
}

**/

// check for emptiness
function isEmpty(str){

  return (str == null || str == undefined || str == "") ? false :true;
}
// cretate 
function createUser() {

  // accept user input
  var fName = document.getElementById('fname').value.trim(),
      lName = document.getElementById('lname').value.trim(),
      userName = document.getElementById('username').value.trim(),
      password = document.getElementById('passowrd').value.trim(),
      email = document.getElementById('email').value.trim(),
      department = document.getElementById('department').value.trim(),
      bio = document.getElementById('bio').value.trim();

  if ( !isEmpty(fName) || !isEmpty(lName) || !isEmpty(userName) || !isEmpty(password)  || !isEmpty(email) || !isEmpty(department) || !isEmpty(bio)) {
      document.getElementById('result').innerHTML = "Every field is mandatory";

  }


}

/**
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

//sign in
function showLoginBox() {
  // Do whatever DOM operations you need to show the login/registration box.
  $("#loginButton").on("click", function() {
    authClient.login("password", {
      email: $("#email").val(),
      password: $("#password").val(),
      rememberMe: $("#rememberCheckbox").val()
    });
  });
}
**/
