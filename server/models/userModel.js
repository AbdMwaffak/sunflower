const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'User must have email address!'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'please porvide a valid email!'],
    },
    username: {
      type: String,
      required: [true, 'User must have username'],
    },
    phone: {
      type: String,
      required: [true, 'User must have a valid phone number'],
    },
    image: {
      type: String,
      // default:"default.jpg"
    },
    birthday :  Date,
    password: {
      type: String,
      required: [true, 'User must have password!'],
      minLength: 8,
      select: false,
    },

    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password!'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'passwords are not the same!',
      },
    },
    passwordChangeAt: Date,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    gender :{
      type : String,
      enum : ['male','female']
    },
    address: {
      city: {
        type: String,
        default: '',
      },
      neighborhood: {
        type: String,
        default: '',
      },
      street: {
        type: String,
        default: '',
      },
      details: {
        type: String,
        default: '',
      },
    },
    points: {
      type: Number,
      default: 0,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    ordersCount: {
      type: Number,
      default: 0,
    },
    favoriteProducts : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// userSchema.virtual('orders', {
//   ref: 'Order',
//   foreignField: 'user',
//   localField: '_id',
// });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.username = this.username.toLowerCase();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candinatePassword,
  userPassword
) {
  return await bcrypt.compare(candinatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false; // it means not changed
};

const User = mongoose.model('User', userSchema);

module.exports = User;


// Handle shopping Cart
// https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose