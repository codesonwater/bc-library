const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const credentials = require("../credentials.json");

initializeApp({
  credential: cert(credentials),
});

const db = getFirestore();
const usersRef = db.collection("users");

//Q. how many lines of code does it take to make an api? | A. 3

const express = require("express");

const app = express();
app.use(express.json());

//param 1 is always request; param2 is always respond
app.get("/", (req, res) => {
 usersRef
    .get()
    .then(snapshot => {
        res.send(snapshot.docs)
    })

//   res.send("Hello World");
});

app.post("/users", (req, res) => {
  const { name, age, email } = req.body; //whatever you send to the server you always send in body
  //const name = req.body.name
  //const age = req.body.name
  const user = { name, age, email };
  const result = `My name is ${user.name}, I am ${user.age} years old and my email is ${user.email}`;

  res.send(result);
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
