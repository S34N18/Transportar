// backend/src/config/database.js
const { Sequelize } = require('sequelize');
const logger = require('./logger');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Initialize models
const User = require('../models/User')(sequelize);

// Export models and sequelize
const db = {
  sequelize,
  Sequelize,
  User
};

// Test connection and sync
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('✅ Database connection established successfully');
    
    // Sync models (alter: true in development, false in production)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    logger.info('✅ Database models synchronized');
  } catch (error) {
    logger.error('❌ Unable to connect to database:', error);
    process.exit(1);
  }
};

module.exports = { db, connectDB };