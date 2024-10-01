const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  offerId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Offer',
    required : true
  },
  quantity : {
    type : Number,
    default : 1
  }
})
const shoppingCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique : true
      },
      moneyProducts: {
        type : [
          {
            product: {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'Product'
            },
            quantity: {
              type : Number,
              default : 1
            },
            size : String,
            price : Number,
            color : String
  
          },
        ],
        default : []
      },
      pointsProducts: {
        type : [
          {
            product: {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'Product'
            },
            quantity: {
              type : Number,
              default : 1
            },
            size : String,
            price : Number,
            color : String
  
          },
        ],
        default : []
      },
      offers : [offerSchema],
      
      active: {
        type: Boolean,
        default: true
      },
      pointsEarned:{
        type : Number,
        default : 0
      },
      modifiedOn: {
        type: Date,
        default: new Date()
      }
},{ timestamps: true })

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;