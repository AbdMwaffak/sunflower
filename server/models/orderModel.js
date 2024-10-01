const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    basketId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ShoppingCart',
        required : true
    },
    isPaid : {
        type : Boolean,
        default : false
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }  
})

const Order = mongoose.model('Order' , orderSchema);

module.exports = Order;