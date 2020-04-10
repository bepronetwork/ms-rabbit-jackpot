# How Create a Migration With MongoDB 👨🏻‍💻

## Prerequisites

- **migrate-mongo** - A database migration tool for MongoDB in Node.

## Installation

```npm
$ npm install -g migrate-mongo
```

## CLI Usage

```npm
$ migrate-mongo
Usage: migrate-mongo [options] [command]


  Commands:

    init                  initialize a new migration project
    create [description]  create a new database migration with the provided description
    up [options]          run all unapplied database migrations
    down [options]        undo the last applied database migration
    status [options]      print the changelog of the database

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Start Migration Creation

First make sure you have **NodeJs version 8.0.0 (or higher)** installed.

In the project, start a new migrate-mongo (if it doesn't already exist) with the following command:

```npm
$ migrate-mongo init
Initialization successful. Please edit the generated migrate-mongo-config.js file
```

When you run this command two things will happen:

1. Create a sample 'migrate-mongo-config.js' file
2. Create a 'migrations' directory

Edit the migrate-mongo-config.js file with the necessary settings, by default it comes like this:

```javascript
// In this file you can configure migrate-mongo
 
module.exports = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: "mongodb://localhost:27017",
 
    // TODO Change this to your database name:
    databaseName: "YOURDATABASENAME",
 
    options: {
      useNewUrlParser: true // removes a deprecation warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },
 
  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",
 
  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog"
};
```

Para este projeto (BetProtocol => ms-master) ele terá essa configuração: 

```javascript
// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: "mongodb://BetProtocolAdmin:wNmm4OmASXEp8UXi@cluster0-shard-00-00-2gxjd.mongodb.net:27017,cluster0-shard-00-01-2gxjd.mongodb.net:27017,cluster0-shard-00-02-2gxjd.mongodb.net:27017/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=true",

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
```
After the configuration is made, a migration is created with the following command:

```npm
$ migrate-mongo create <tittle>
Created: migrations/20160608155948-tittle.js
```

A new migration file is created in the 'migrations' directory in this format:

```javascript
module.exports = {
  up(db, client) {
    // TODO write your migration here. Return a Promise (and/or use async & await).
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },
 
  down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
```

Then there will be two states UP and DOWN, in which Up you create the logic you want to add to some database file, the creation of the UP migration is mandatory, whereas the DOWN migration is not mandatory and serves to place the logic of removal of files that were added by UP migration to the database, that is, to return to the previous state.

To check the **status** of a migration, run the following command:

```npm
$ migrate-mongo status
┌─────────────────────────────────────────┬────────────┐
│ Filename                                │ Applied At │
├─────────────────────────────────────────┼────────────┤
│ 20160608155948-tittle.js                │ PENDING    │
└─────────────────────────────────────────┴────────────┘
```

**Migrate up**
This command will apply all pending migrations

```npm
$ migrate-mongo up
MIGRATED UP: 20160608155948-tittle.js
```

If an an error occurred, it will stop and won't continue with the rest of the pending migrations

If we check the status again, we can see the last migration was successfully applied:

```npm
$ migrate-mongo status
┌─────────────────────────────────────────┬──────────────────────────┐
│ Filename                                │ Applied At               │
├─────────────────────────────────────────┼──────────────────────────┤
│ 20160608155948-tittle.js                │ 2019-01-21T20:13:30.415Z │
└─────────────────────────────────────────┴──────────────────────────┘
```

**Migrate down**
With this command, migrate-mongo will revert (only) the last applied migration

```npm
$ migrate-mongo down
MIGRATED DOWN: 20160608155948-tittle.js
```

Like migrate Up you can check the status of the migration and everything and create a migration and execute the necessary commands for its execution!

## Thanks For Attention 👏🏼😉😌
