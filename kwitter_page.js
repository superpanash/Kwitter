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
    firebase.initializeApp(firebaseConfig);//YOUR FIREBASE LINKS

    user_name=localStorage.getItem("user_name");
    room_name=localStorage.getItem("room_name");

    function send(){

      msg=document.getElementById("msg").value ;
      firebase.database().ref(room_name).push({
           name:user_name,
           message:msg,
           like:0      
      });
      document.getElementById("msg").value="";

    }


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code

console.log(firebase_message_id);
console.log(message_data);

name=message_data["name"];
message=message_data["message"];
like=message_data["like"];

name_tag="<h4>"+ name +"<img src='tick.png' class='user_tick'></h4>";
message_tag="<h4 class='message_h4'>"+ message +"</h4>";
like_tag="<button class='btn btn-info' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)' >";
span_tag="<span class='glyphicon glyphicon-thumbs-up'>Like : "+like+"</span></button> <hr>";

row=name_tag+message_tag+like_tag+span_tag;
document.getElementById("output").innerHTML+=row;

//End code
      } });  }); }
getData();


function update_like(message_id){
  console.log(message_id);
  button_id=message_id;
  likes=document.getElementById(button_id).value;
  updated_like=Number(likes)+1;
  console.log(updated_like);
  firebase.database().ref(room_name).child(message_id).update({
    like:updated_like
  });
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location="index.html";
}