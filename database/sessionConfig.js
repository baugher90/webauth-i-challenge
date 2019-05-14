const session = require('express-session');
const KnexSessionStore = require(`connect-session-knex`)(session);


const sessionConfig = {
    name: 'cookie',
    secret: 'keep it secret, keep it safe',
    cookie: {
      maxAge: 1000*60*60,
      secure: false,
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require('../database/dbConfig'),
      tablename: 'session',
      sidfilename: 'sid',
      createtable: true,
      clearInterval: 1000*60*60,
    })
  
  }
module.exports = sessionConfig;