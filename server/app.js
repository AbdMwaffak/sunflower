// const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const perfumeRoutes = require('./routes/perfumeRoutes');
const chocolateRoutes = require('./routes/chocolateRoutes');
const naturalFlowerRoutes = require('./routes/naturalFlowerRoutes');
const naturalFlowerOrderRoutes = require('./routes/naturalFlowerOrderRoutes');
const bandRoutes = require('./routes/bandRoutes');
const paperRoutes = require('./routes/paperRoutes');
const shoppingCartRoutes = require('./routes/shoppingCartRoutes');
const perfumeOrderRoutes = require('./routes/perfumeOrderRoutes');
const offerRoutes = require('./routes/offerRoutes');
const cityRoutes = require('./routes/cityRoutes');
const messageRoutes = require('./routes/messageRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const settingRoutes = require('./routes/settingRoutes');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/products', productRoutes);
app.use('/category', categoryRoutes);
app.use('/perfume', perfumeRoutes);
app.use('/perfumeOrder', perfumeOrderRoutes);
app.use('/chocolate', chocolateRoutes);
app.use('/naturalFlowers', naturalFlowerRoutes);
app.use('/naturalFlowersOrders', naturalFlowerOrderRoutes);
app.use('/bands', bandRoutes);
app.use('/papers', paperRoutes);
app.use('/shoppingCart' , shoppingCartRoutes);
app.use('/offers', offerRoutes);
app.use('/cities',cityRoutes);
app.use('/messages',messageRoutes);
app.use('/aboutus',aboutUsRoutes);
app.use('/settings',settingRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find this route ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);

module.exports = app;
