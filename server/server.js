const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()


// Import
const User = require('./model/User')
const authRoute = require('./routes/auth/auth')
const auth = require('./routes/tokenAuth')

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => 
    console.log('Connected to database.')
)

// Middleware
app.use(cors())
app.use(express.json())
// Route Middlewares
app.use('/auth', authRoute)

// Get user data
app.get('/user_data', auth, (req, res) => {
    User.findById(
        req.userID
    ).then(userData => 
        res.send(userData)
    )
})

// POST /buy/:id
// Buy cryptocurrency
app.post('/buy/:id', auth, (req, res) => {
    const user_id = req.userID
    const coin_id = req.body.coin_id
    const quantity = req.body.quantity
    const price_paid_per = req.body.price_paid_per

    console.log(`Attemping to buy ${quantity} of ${coin_id} for user ${user_id}`)
    console.log('Looking for matching user')

    User.findById(
        user_id,
        {
            "coins": {
                $elemMatch: { "coin_id": coin_id }
            }
        }
    ).then(doc => {
        if (doc.coins.length > 0) {
            console.log('User already owns some of this coin, updating entry')
            const new_quantity = +quantity + +doc.coins[0].quantity
            const new_avg_price = ((+quantity*+price_paid_per)+(+doc.coins[0].quantity*+doc.coins[0].avg_price))/new_quantity
            User.findOneAndUpdate(
                { "_id": user_id, "coins.coin_id": coin_id },
                {
                    $set: {
                        "coins.$.quantity": new_quantity,
                        "coins.$.avg_price": new_avg_price
                    }
                },
                { new: true }
            ).then(() => console.log('Entry updated'))
        } else {
            console.log('User does not own coin, creating new entry')
            User.findByIdAndUpdate(
                user_id,
                {
                    $push: {
                        coins: { 
                            coin_id: coin_id, 
                            quantity: quantity, 
                            avg_price: price_paid_per 
                        }
                    } 
                },
                { new: true }
            ).then(() => console.log('Entry created'))
        }

        // Update the cash balance
        User.findByIdAndUpdate(
            user_id,
            { $inc: { cash: -(+quantity * +price_paid_per) } },
            { new: true }
        ).then(doc => {
            console.log('cash updated')
            res.send(doc)
        })
    })
})

// POST /sell/:id
// Sell cryptocurrency
app.post('/sell/:id', auth, (req, res) => {
    const user_id = req.userID
    const coin_id = req.body.coin_id
    const quantity = req.body.quantity
    const price_sold_per = req.body.price_sold_per

    User.findOneAndUpdate(  // Decrement portfolio quantity
        { "_id": user_id, "coins.coin_id": coin_id },
        {
            $inc: { "coins.$.quantity": -quantity }
        },
        { new: true }
    ).then(() => { // Remove the coin if quantity is 0
        User.findOneAndUpdate(
            { "_id": user_id, "coins.coin_id": coin_id },
            {
                $pull: {
                    coins: {
                        quantity: 0
                    }
                }
            },
            { new: true }
        ).then(() => {  // Update the cash balance
            User.findByIdAndUpdate(
                user_id,
                {
                    $inc: { "cash": (+quantity*+price_sold_per) }
                },
                { new: true }
            ).then(doc => {
                res.send(doc)
            })
        })
    })
 
})

app.listen(3001, () => {
    console.log("Server running on port 3001");
})