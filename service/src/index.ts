import express from 'express';
import { setupDb } from './store/db';
import { setupSessions } from './middlewares/session';
import { routes } from './routes';

const app = express();
const port = process.env.PORT;

setupSessions(app)
app.use('/', routes);
setupDb()
  .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });
