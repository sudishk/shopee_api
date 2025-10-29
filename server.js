require("dotenv").config();
const express = require("express");//import
const db = require("./db")
const jwt = require("jsonwebtoken")
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express(); // object

app.use(express.json()); // adding middle ware
const storage = multer.diskStorage({
    destination:"./profileImages",
    filename:(request, file,  cb)=>{
        cb(null, Date.now() + path.extname(file.originalname) );
    }
})
const upload = multer({storage: storage});

app.use("/profileImages", express.static("profileImages")) // for allowing image by url=http://127.0.0.1:3000/profileImages/1761380677453.png

app.post("/api/user/profile", upload.single("profilePic"),(req,res)=>{
    if(!req.file){
        
        res.status(400).json({
            message: "Please upload profile pic or select"
        });
    }else{
        const filename = req.file.path;
        const id = req.body.id;
         db.query("UPDATE users SET profilePic=? WHERE id=?",[filename, id] ,(eror, result)=>{
            console.log(eror);
        if(eror) return response.status(500).json({message : "Server internal error" + eror});
        response.status(201).json({id: result.insertId, name : name, email: email});
        });
        res.status(200).json({
            message: "Profile pic uploaded"
        });
    }
});

// password hashing -register
app.post("/api/user", async (reqest, response)=> {
    const name = reqest.body.name;
    const email = reqest.body.email;
    const password = reqest.body.password;
    const passwordHash =await bcrypt.hash(password, 10) // 2 ka power 10 standard 
        db.query("INSERT INTO users(name, email, password) VALUES (? , ?, ?)",[name, email,passwordHash] ,(eror, result)=>{
            console.log(eror);
        if(eror) return response.status(500).json({message : "Server internal error" + eror});
        response.status(201).json({id: result.insertId, name : name, email: email});

    } );
});

// password hashing -register
app.post("/api/user/login", async (reqest, response)=> {
    const email = reqest.body.email;
    const password = reqest.body.password;
        db.query("SELECT * FROM users WHERE email=?",[ email] ,async (eror, result)=>{
            // result - []
            console.log(eror);
        if(eror) return response.status(500).json({message : "Server internal error" + eror});
        const dbPassword = result[0].password;
        const name = result[0].name;
        const email = result[0].email;
        const isPasswordSame =await bcrypt.compare(password, dbPassword);
        if(isPasswordSame){
            const secretKey ="ghdfjjgi9ew8865w";
            const token = jwt.sign({name:name, email: email }, secretKey, {expiresIn:"1h"} );// token creating
            response.status(200).json({message: "login successfully", token: token})

        }else{
            response.status(200).json({message: "login failed"})
        }

    } );
});


app.get("/api/users", (reqest, response)=>{
    const token = reqest.headers.authorization;
    const secretKey ="ghdfjjgi9ew8865w";
    jwt.verify(token, secretKey, (eror, result)=>{
        if(eror) {
            response.status(400).json({message: "unauthorized"})
        }else{
             db.query("SELECT * FROM users",(eror, data)=>{
                 if(eror) return response.status(500).json({message : "Server internal error"});
                     response.status(200).json(data);
                } );
             
        }
    })
   
});

app.post("/api/person", (reqest, response)=> {
    const name = reqest.body.name;
    const age = reqest.body.age;

        db.query("INSERT INTO person(name, age) VALUES (? , ?)",[name, age] ,(eror, result)=>{
        if(eror) return response.status(500).json({message : "Server internal error" + eror});
        response.status(201).json({id: result.insertId, name : name, age: age});

    } );
});

app.put("/api/person/:id", (reqest, response)=> {
    const name = reqest.body.name;
    const age = reqest.body.age;
    const id = reqest.params.id;
        db.query("UPDATE person SET name=? , age=? WHERE id=?",[name, age, id] ,(eror, result)=>{
        if(eror) return response.status(500).json({message : "Server internal error" + eror});
        response.status(200).json({message: "Data updated succesfully", name : name, age: age});

    } );
});

app.delete("/api/person/:id", (reqest, response)=> {
    const id = reqest.params.id;
        db.query("DELETE FROM person WHERE id=?",[id] ,(eror, result)=>{
        if(eror) return response.status(500).json({message : "Server internal error" + eror});
        response.status(200).json({message: "Person deleted succesfully"});

    } );
});

app.listen(3000,()=>{
    console.log("Server is running");
});

