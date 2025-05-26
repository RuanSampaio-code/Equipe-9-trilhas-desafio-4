require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: process.env.origin || '*'
}));

app.use(express.json());

const complaintRouter = require('./src/routes/complaintRoutes');
const commentRouter   = require('./src/routes/commentRoutes');
const rechargeRouter  = require('./src/routes/rechargeRoutes');
const authRouter = require('./src/routes/authRoutes');

app.use('/', authRouter);
app.use('/', complaintRouter);
app.use('/', commentRouter);
app.use('/', rechargeRouter);

module.exports = app;
