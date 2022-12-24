
// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyAJPfp4PHCn6vglNAS2Cywv_swFxqyeKPA",
      authDomain: "kwitter-cd53e.firebaseapp.com",
      databaseURL: "https://kwitter-cd53e-default-rtdb.firebaseio.com",
      projectId: "kwitter-cd53e",
      storageBucket: "kwitter-cd53e.appspot.com",
      messagingSenderId: "739436132388",
      appId: "1:739436132388:web:ac96e065ad5553194e00b1"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="Welcome "+user_name+" !";

function add_room(){
      room_name=document.getElementById("room_name").value;
      
      firebase.database().ref("/").child(room_name).update({
            purpose:"creating a new room"   
      });

      localStorage.setItem("room_name",room_name)
      window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("All rooms are in here"+Room_names);

      row="<div class='room_name' id="+Room_names+" onclick='redirect_to_room_name(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();

function redirect_to_room_name(name){
      console.log("selected room is"+name);
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}

