
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

var socket = io();
console.log('firebase check')
const firebaseConfig = {
  apiKey: "AIzaSyCEgJprEC6WGAExQj8GQfLHLx0yslNy-EI",
  authDomain: "ajinx-b5a51.firebaseapp.com",
  projectId: "ajinx-b5a51",
  storageBucket: "ajinx-b5a51.appspot.com",
  messagingSenderId: "343420014891",
  appId: "1:343420014891:web:a1cfe8873c1b7bca58b56e",
  measurementId: "G-693MKX1Y8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getDatabase,
    ref,
    set,
    child,
    get,
    onValue
  } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

function writeUserData(userId, name, email) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    
  });
}
function writeMessage(message){
    const db = getDatabase();
    set(ref(db, 'messages/' + message), {
      message: message
    })
}
function writeName(name){
  const db = getDatabase();
  set(ref(db, "names/" + name), {
    name: name
  })
}
let mess = [];
function readData(){
const dbRef = ref(getDatabase());
get(child(dbRef, `messages/${message}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
let data = JSON.stringify(snapshot.val());
sendData(data);
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

}
function sendData (mess){
  socket.emit("messValue", mess, (responce) => {
    console.log(responce);
  });


}
socket.on("messageRedirect", (arg, responce) => {
writeMessage(arg);
console.log(responce);
})
socket.on("nameRedirect", (arg, responce) => {
writeName(arg);
})
