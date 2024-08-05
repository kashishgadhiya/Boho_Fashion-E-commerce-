const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema({
    userId: { type: Schema.Types.String, ref: 'User' },
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    street: String,
    city: String,
    state: String,
    pinCode: String,
    country: String,
    phoneNumber: String,
    cartItems: [
        {
            id: String,
            name: String,
            price: Number,
            quantity: Number,
            total: Number,
            image: String
        }
    ],
    totalAmount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = models?.Order || model('Order', orderSchema);
