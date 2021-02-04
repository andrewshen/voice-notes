const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const userRouter = require('./routes/User');
const connection = process.env.DB_CONNECTION;

app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log(err));

app.use('/user', userRouter);
app.use(express.static('client/build'));
app.use(routes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Express Server Started');
});
