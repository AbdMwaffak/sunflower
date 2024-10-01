// const dotenv = require('dotenv');

// const env = dotenv.config({ path: './config.env' });
const config = require('./config/config');
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(config.dbLocal, {
    // return a promise
    // useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false
  })
  .then(() => {
    console.log('DB Connection successful!');
  })
  .catch((err) => console.log(err));

const port = config.port || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
