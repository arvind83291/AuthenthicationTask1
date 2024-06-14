const express = require("express");
const jwt = require("jsonwebtoken");
// const body = require("body-parser")
const jwtpassword="123456";
const app = express();
app.use(express.json());

const All_Users = [
    {
        username:"Arvind@gmail.com",
        password:"1234",
        name:"arvind"
    },
    {
        username:"shekhar@gmail.com",
        password:"123",
        name:"shekhar"
    },
    {
        username:"vishal@gmail.com",
        password:"123456",
        name:"vishal"
    }
];

function User_Exists(username,password){
//Logic to verify the User Exists or not
let userExist = false
for(let i = 0; i < All_Users.length; i++){
    if(All_Users[i].username == username && All_Users[i].password == password){
        userExist = true
    };
}
return userExist;

}
app.post("/Login",function(req,res){
    const username= req.body.username;
    const password= req.body.password;

    if(!User_Exists(username,password)){
        return res.status(403).json({
            msg:"User does not Exists in our memory"
        });
    }

    var token = jwt.sign({username:username},jwtpassword);
    return res.json({
        token,
    });
})

app.get("/users", function (req,res) {
    const token= req.headers.authorization;
        const decoded = jwt.verify(token,jwtpassword)
        const username = decoded.username;

        res.json({
            users:All_Users.filter((value)=>{
                if(value.username==username){
                    return false
                }else{
                    return true
                }
            })
        })
});
app.listen(3001);

