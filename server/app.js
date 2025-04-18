const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors());
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

app.use((req, res, next) => {
  const host = req.headers.host;
  // Check for user domain
  if (host === 'sunflowerworld.shop' || host === 'www.sunflowerworld.shop') {
    app.use(express.static(path.join(__dirname, '../user/dist')));
  }
  // Check for admin domain
  else if (host === 'dunia.sunflowerworld.shop') {
    app.use(express.static(path.join(__dirname, '../admin/dist')));
  }

  next();
});

const allowedOrigins = [
  'www.sunflowerworld.shop',
  'sunflowerworld.shop',
  'dunia.sunflowerworld.shop',
  '62.72.12.52',
];

// Middleware for handling CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if the incoming origin is in the list of allowed origins
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Set other headers that might be needed
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );

  // If the client sends a preflight request with OPTIONS, respond with status 200
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // CORS preflight response --
  }

  next();
});

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
const orderRoutes = require('./routes/orderRoutes');
const sseRoutes = require('./routes/sseRoutes');

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/perfume', perfumeRoutes);
app.use('/api/perfumeOrder', perfumeOrderRoutes);
app.use('/api/chocolate', chocolateRoutes);
app.use('/api/naturalFlowers', naturalFlowerRoutes);
app.use('/api/naturalFlowersOrders', naturalFlowerOrderRoutes);
app.use('/api/bands', bandRoutes);
app.use('/api/papers', paperRoutes);
app.use('/api/shoppingCart', shoppingCartRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/aboutus', aboutUsRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sse', sseRoutes);

// dunia121247
app.get('*', (req, res) => {
  const host = req.headers.host;
  if (host === 'sunflowerworld.shop' || host === 'www.sunflowerworld.shop') {
    // Serve user application
    res.sendFile(path.join(__dirname, '../user/dist/index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  } else if (host === 'dunia.sunflowerworld.shop') {
    // Serve admin application
    res.sendFile(path.join(__dirname, '../admin/dist/index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  } else {
    // Handle other hostnames or return 404
    res.status(404).send('Not Found');
  }
});
app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find this route ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
