const mongoose = require('mongoose');


const productDesignSchema = new mongoose.Schema({
   
    tshirtcolor: {
        type: String,
        // required: true 
        
    },
    upperText: {
        type: String,
        default: ''
    },
    lowerText: {
        type: String,
        default: ''
    },
    Designimg: {
        type: String,
        default: ''
    },
    textSize: {
        type: Number,
        default: 12
    },
    textColor: {
        type: String,
        default: 'black'
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const ProductDesign = mongoose.model('ProductDesign', productDesignSchema);

module.exports = ProductDesign;
