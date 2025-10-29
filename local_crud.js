const express = require("express");//import
const db = require("./db")
const app = express(); // object

app.use(express.json()); // adding middle ware
const users =[
    {id:1, name: "Vikash", age:30},
    {id:2, name: "puja", age:40},
    {id:3, name: "Rohit", age:50}
];
app.get("/", (req, res)=>{
    res.send("Welcome to shopee Api");
});

app.get("/api/users", (req, res)=>{
    res.status(200).json(users);
});

app.post("/api/user", (req, res)=> {
    const name = req.body.name;
    const age = req.body.age;
    const user = {
        id: users.length+1 , name: name, age:age
    };
    users.push(user);
    res.status(201).json({"message": "User created successfully", "data": user});
});


app.listen(3000,()=>{
    console.log("Server is running");
});

