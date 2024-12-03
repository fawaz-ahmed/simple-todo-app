import session from "express-session";
import { Express } from 'express';

const connectString = process.env.DB_CONNECT_STRING || '';

const MongoDBStore = require('connect-mongodb-session')(session)

const store = new MongoDBStore({
  uri: connectString,
  collection: 'mySessions',
  databaseName: 'todo-app-db'
});

store.on('error', function(error: any) {
  console.log('store error', error);
});

const setupSessions = (app: Express) => app.use(session({
  secret: 'session-secret',
  cookie: {
    secure: false,
    httpOnly: true,
    // maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));

export { setupSessions }