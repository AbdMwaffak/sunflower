const mongoose = require('mongoose');

const naturalFlowerSchema = new mongoose.Schema({
    count : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description :{
        type : String,
         required : true
    },

    image : String
})

const NaturalFlower = mongoose.model('NaturalFlower' , naturalFlowerSchema);

module.exports = NaturalFlower;