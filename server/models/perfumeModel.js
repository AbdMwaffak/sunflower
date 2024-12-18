const mongoose = require('mongoose');

const perfumeVariant = new mongoose.Schema({
  size: String,
  price: Number,
  available: {
    type: Boolean,
    default: true,
  },
});

const perfumeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: 'Sunflower',
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  // nameAr : {
  //     type : String,
  //     trim : true,
  //     default : 'Sunflower'
  // },
  descriptionAr: {
    type: String,
    // required: true,
    trim: true,
  },
  images: {
    type: [String],
  },
  variants: [perfumeVariant],
});

const Perfume = mongoose.model('Perfume', perfumeSchema);

module.exports = Perfume;

/*
const perfumeVariant = new mongoose.Schema({
    size : String,
    price : Number,
    available : Boolean
  });

const perfumeSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        default : 'Sunflower'
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    images : {
        type : [String],
        default : ['1708965714538_dp-of-love.jpeg','1708965714538_dp-of-love.jpeg','1708965714538_dp-of-love.jpeg']
    },
    variants : [perfumeVariant]
    
})


*/

/*
const perfumeSchema = new mongoose.Schema({
    

    name : {
        type : String,
        trim : true,
        default : 'Sunflower'
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    images : {
        type : [String],
        default : ['1708965714538_dp-of-love.jpeg','1708965714538_dp-of-love.jpeg','1708965714538_dp-of-love.jpeg']
    },

    available : {
        small : {
            type : Boolean,
            default : true
        },
        medium : {
            type : Boolean,
            default : true
        },
        large : {
            type : Boolean,
            default : true
        }
    },
    price : {
        small : {
            type : Number,
            default : 0
        },
        medium : {
            type : Number,
            default : 0
        },
        large : {
            type : Number,
            default : 0
        }
    }


    
})


*/
