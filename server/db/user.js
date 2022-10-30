const mongoose = require('mongoose');
let Schema = mongoose.Schema

let userSchema = new Schema({
    username: {type:String,required:true},
    password: {type:String,required:true},
    tx:{ type:String,default:'/tx/fk.png'},
    regTime:{ type:Number,default:Date.now()},
    admin: {type:Boolean,default:false}
})
module.exports = mongoose.model('user', userSchema)
