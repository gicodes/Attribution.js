require('dotenv').config();

const cors = require('cors');
const express = require('express');
const routes = require('./routes/index.js');
const connectDb = require('./config/attr.db.connect.js');

const app = express();

const corsOptions = {
  origin: ['https://afrofashion.site', 'http://localhost:5001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
connectDb();
app.use('/api', routes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});;