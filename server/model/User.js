const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    coin_id: {
        type: String,
        required: true,
        max: 255
    },
    quantity: {
        type: Number,
        required: true,
    },
    avg_price: {
        type: Number,
        required: true,
    },

})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    cash: {
        type: Number,
        required: true,
    },
    coins: [coinSchema]
})

module.exports = mongoose.model('User', userSchema);