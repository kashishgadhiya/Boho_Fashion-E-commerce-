const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        unique:true,

        },
        password:{
            type:String,
        },
        cartData:{
            type:Object,
        },
        date:{
            type:Date,
            default :Date.now,
        }
  
});

module.exports = models?.User || model('User', userSchema);
