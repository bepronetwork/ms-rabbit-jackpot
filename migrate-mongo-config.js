// In this file you can configure migrate-mongo
require('dotenv').config();

const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00-${process.env.MONGO_ID}.mongodb.net:27017,cluster0-shard-00-01-${process.env.MONGO_ID}.mongodb.net:27017,cluster0-shard-00-02-${process.env.MONGO_ID}.mongodb.net:27017/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,

    // TODO Change this to your database name:
    databaseName: "main",

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog"
};

// Return the config as a promise
module.exports = config;
