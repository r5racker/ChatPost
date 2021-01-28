var mongoose     = require('mongoose');
var RelationsSchema       = new mongoose.Schema({
        userId:String,
        frinedId:String
    },{
        timestamps:true
    })
module.exports = mongoose.model('Relation',RelationsSchema);