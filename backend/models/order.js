const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema({
    name:{
        type:String,

    },
    amount:{
        type:Number
      

        },
        order_id:{
            type:String,
        },
        razorpay_payment_id:{
            type:String,
            default:null
        },
        razorpay_order_id:{
            type:String,
            default:null
        },
        razorpay_signature:{
            type:String,
            default:null
        }
    },
        {
            timestamps:true
        
  
});

module.exports = models?.User || model('order', orderSchema);
