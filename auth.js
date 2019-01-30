  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD1qhX9vqrRX6h0jK_mvfg6XOAVZLieRNA",
    authDomain: "form-cf10c.firebaseapp.com",
    databaseURL: "https://form-cf10c.firebaseio.com",
    projectId: "form-cf10c",
    storageBucket: "form-cf10c.appspot.com",
    messagingSenderId: "98195973306"
  };
  firebase.initializeApp(config);
function signup(){
  let name = document.getElementById("user").value;
  let country = document.getElementById("Country").value;
  let mobile = document.getElementById("Mobile").value;
  let usermail = document.getElementById("email").value;
  let userpass = document.getElementById("pwd").value;
  // document.getElementById("loaders").style.display = "block"
  firebase.auth().createUserWithEmailAndPassword(usermail,userpass)
.then(()=>{
    let userdata={
        name,
        country,
        mobile,
        email,
        createTime: firebase.database.ServerValue.TIMESTAMP


    }
   
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + userId).set(userdata)

    .then((success) => {
        swal({
            title: "Account Created",
            text: "You may proceed",
            icon: "success",
            button: "Login",
          });
        window.location = 'signin.html'
    })
    .catch((error) => {
        swal({
            title: "Plug In",
            text: error.message,
            icon: "warning",
            button: "OK",
        });
    })
})
        .catch((error) => {
          // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                title: "Connection Error",
                text: errorMessage,
                icon: "warning",
                button: "OK",
            });
        });



}

function login(){
let loginemail=document.getElementById('email').value;
let loginpwd=document.getElementById('pwd').value;
firebase.auth().signInWithEmailAndPassword(loginemail, loginpwd)
.then((success)=>{
  localStorage.setItem("userauth", JSON.stringify(success))
  window.location = 'home.html'



})
.catch(function (error) {
  // document.getElementById("loaders").style.display = "none"
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  swal({
      title: "Authentication Error",
      text: errorMessage,
      icon: "warning",
      button: "OK",
  });
  // ...
});

}
//logout

function logout(){

firebase.auth().signOut()
.then(function () {
    localStorage.setItem("userauth", JSON.stringify({ user: 'null' }))
    // Sign-out successful.
    window.location = "signin.html"
}).catch(function (error) {
    // An error happened.
    var errorMessage = error.message;
    swal({
        title: "Internet Error",
        text: errorMessage,
        icon: "warning",
        button: "OK",
    });
});
}