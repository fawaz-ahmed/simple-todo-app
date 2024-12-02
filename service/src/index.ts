import express, { Request, Response } from 'express';
import session from 'express-session';
import sessionStore from 'connect-mongodb-session';
const mongoDBStore = sessionStore(session);

const app = express();
const port = process.env.PORT;
const connectString = process.env.DB_CONNECT_STRING || '';

const store = new mongoDBStore({
  uri: connectString,
  collection: 'mySessions',
  databaseName: 'todo-app-db'
});

store.on('error', function(error) {
  console.log('store error', error);
});

app.use(session({
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

app.get('/', function(req, res) {
  res.status(200).send('Hello ' + JSON.stringify(req.session));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
