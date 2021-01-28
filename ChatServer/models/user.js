const JWT_SECRET="chatapp123"
var mongoose     = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
var UserSchema       = new mongoose.Schema({
        FName: {type:String , required:true},
        LName: {type:String, required:true},
        phone: {type:String, required:true},
        email: {type:String, required:true,unique:true},
        password: {type:String, required:true},
        imageUrl: {type:String, required:true},
        lastSeen: {type:Date, required:true},
    },{
        timestamps:true
    })

    UserSchema.methods.generatePasswordHash= function (pass){
        const salt = bcrypt.genSaltSync(10)
        this.password=bcrypt.hashSync(pass,salt);
    }

    UserSchema.methods.genToken=function (){
        const payload = {
            FName:this.FName,
            email:this.email
        }
        //return jwt.sign(payload,process.env.JWT_SECRET);
        return jwt.sign(payload,JWT_SECRET);
    }

    UserSchema.methods.generateUserResponse= function (){
        return {
            FName:this.FName,
            email:this.email,
            token: this.genToken()
        }
    }
    UserSchema.methods.isValidPassword=function(password){
        return bcrypt.compareSync(password,this.password)
    }

module.exports = mongoose.model('User',UserSchema);
