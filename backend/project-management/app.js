require("dotenv").config();

const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const cloudRoutes = require('./routes/cloudRoutes');
const projectRoutes = require('./routes/projectRoutes');
const sequelize = require('./database/connection');

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Initialize Sequelize connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Middleware
app.use(express.json());
app.use(cors());



// Routes
app.use(userRoutes);
app.use(projectRoutes);
app.use(cloudRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
