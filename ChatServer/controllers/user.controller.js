const User = require("../models/user");
var MessagesModel     = require('./../models/messages');
const base_static_url="assets/chatserver/public/images/"


module.exports.login = (req,res) => {
    const {email,password} = req.body;
    //console.log(email,userPass)
    User.findOne({email}).then(user => {
        if(user){
            if(user.isValidPassword(password)){
                res.json(user.generateUserResponse())
            }else{
                res.status(401).json({
                    msg:"invalid credentials"
                })
            }
        }else{
            res.status(401).json({
                msg:"invalid credentials"
            })
        }
        
    }).catch(()=>{
        res.status(501).json({
            msg:"something went wrong,please try again"
        })
    })
};

module.exports.register = (req,res) => {
    const {FName,LName,phone,email,password,imageUrl} = req.body;
    const user = new User();
    user.FName=FName;
    user.LName=LName;
    user.phone=phone;
    user.email=email;
    user.generatePasswordHash(password);
    user.imageUrl=imageUrl;
    user.lastSeen=new Date();
    user.save(function (err){
        if (err){
            res.send(err);
            return;
        }
        res.json(user.generateUserResponse())
        return;
    })
    console.log("register")
};

module.exports.fileUpload = (req,res) =>{
    console.log(req.file.filename)
    /*
    res.json({
        imageUrl:base_static_url+req.file.filename
    })
    */
}

module.exports.getAllUser = (req,res) => {
    let userEmail=req.body.email
    User.find(function(err, user_list) {
        if (err){
            res.send(err);
        }
        res.json(user_list);
        return
    });
}

module.exports.deleteUser=(req,res)=>{
    User.deleteOne({email:req.body.email},function(err) {
        if (err){
            res.send(err);
        }
        MessagesModel.deleteMany({"$or": [{
            "senderId": req.body.email
        }, {
            "receiverId": req.body.email
        }]}, function(err) {
            if (err)
                res.send(err);
                res.json({message:"deleted user"});
        });
        return
    });
}
module.exports.getUser=(req,res)=>{
    User.findOne({email:req.body.email},function(err, user) {
        if (err){
            res.send(err);
        }
        res.json(user);
        return
    });   
}