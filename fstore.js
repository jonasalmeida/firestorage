console.log('loaded fstore.js')

// ----
FStore = function(config){ // the object, come back to this later
  console.log('initializeApp ...')
  firebase.initializeApp(config)
  this.db = firebase.firestore()
}
// ---


fstore=function(div){
  div = div||document.getElementById('fstoreDiv')

  fstore.config = {
    apiKey: "AIzaSyBHsH9893f20O9uINTF15LrbWGYSoRzfp4",
    authDomain: "firestorage-3eb8f.firebaseapp.com",
    databaseURL: "https://firestorage-3eb8f.firebaseio.com",
    projectId: "firestorage-3eb8f",
    storageBucket: "firestorage-3eb8f.appspot.com",
    messagingSenderId: "736998299297"
  };
  firebase.initializeApp(fstore.config);

  var h = 'log in to continue:'
  div.innerHTML=h

  fstore.body=div
  fstore.head=document.getElementById('fstoreHead')


  // AuthUI - https://opensource.google.com/projects/firebaseui

  var uiConfig = {
        signInSuccessUrl:location.href,
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          //firebase.auth.GithubAuthProvider.PROVIDER_ID,
          //firebase.auth.EmailAuthProvider.PROVIDER_ID,
          //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'https://github.com/jonasalmeida/fstore'
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          fstore.start(user)
        }        
      })
}

fstore.start=function(user){
  fstore.user=user
  fstore.head.innerHTML='logged as <span style="color:blue">'+user.displayName+'</span> (<span style="color:green">'+user.email+'</span>), <a href="https://github.com/jonasalmeida/firestore" target="_blank" style="color:maroon;font-size:large"> <i class="fa fa-github-alt" aria-hidden="true"></i></a>, <span id="fstoreLogout" style="color:orange;cursor:pointer">logout<i class="fa fa-sign-out" aria-hidden="true"></i></span>'
  fstore.body.innerHTML='Logged in, connecting firebase ...'
  fstoreLogout.onclick=function(){
    firebase.auth().signOut()
     .then(function(){
       location.reload()
     })
  }
  // hide ui-auth element
  document.getElementById("firebaseui-auth-container").hidden=true
  fstore.startDb()
}

fstore.startDb=function(){ //https://firebase.google.com/docs/firestore/quickstart?authuser=0
  fstore.db = firebase.firestore();
  fstore.body.innerHTML='Logged in, connected to database'
  //debugger
}

fstore.insert=function(col,doc,id){ // https://cloud.google.com/firestore/docs/manage-data/add-data
  if(!id){ // this is about adding
    if(Array.isArray(doc)){ // multiple additions
      var batch = fstore.db.batch()
      doc.forEach(function(d){
        batch.set(fstore.db.collection(col).doc(),d)
      })
      batch.commit()
    }else{ // single document addition
      fstore.db.collection(col).add(doc)
       .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id)
      })
       .catch(function(error) {
          console.error("Error adding document: ", error)
      })
    }     
  }else{ // this is about updating
    fstore.db.collection(col).doc(id).update(doc)
  }   
}

fstore.remove=function(col,doc,id){ //
  //
}


// Initialize Firebase
  




  //firebase.initializeApp(config);


/*
"AIzaSyBHsH9893f20O9uINTF15LrbWGYSoRzfp4"
*/

$(function(){
    fstore()
});
