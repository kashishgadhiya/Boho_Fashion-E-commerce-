const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
    userId: { type: String, unique: true, default: () => Date.now().toString() },
    name: String,
    email: { type: String, unique: true },
    password: String,
    cartData: Object,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    date: { type: Date, default: Date.now }
});

module.exports = models?.User || model('User', userSchema);
