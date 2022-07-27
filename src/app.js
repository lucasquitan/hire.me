import express from 'express';
import routes from './routes/url';
import db from './db';

(async () => {})();
db.sync();

const app = express();
app.use(express.json());
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`=> The server is running on port http://localhost:${PORT}`);
});
