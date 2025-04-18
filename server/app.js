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

const serveUserApp = express.static(path.join(__dirname, '../user/dist'));
const serveAdminApp = express.static(path.join(__dirname, '../admin/dist'));

app.use((req, res, next) => {
  const host = req.headers.host;
  // Check for user domain
  if (host === 'sunflowerworld.shop' || host === 'www.sunflowerworld.shop') {
    return serveUserApp(req, res, next);
  }
  // Check for admin domain
  else if (host === 'dunia.sunflowerworld.shop') {
    return serveAdminApp(req, res, next);
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
    return res.sendStatus(200); // CORS preflight response
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
app.use('/shoppingCart', shoppingCartRoutes);
app.use('/offers', offerRoutes);
app.use('/cities', cityRoutes);
app.use('/messages', messageRoutes);
app.use('/aboutus', aboutUsRoutes);
app.use('/settings', settingRoutes);
app.use('/orders', orderRoutes);
app.use('/sse', sseRoutes);

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
