import app from './app.js';
import mongoose from 'mongoose';

const db = process.env.DATABASE_URL;

mongoose
  .connect(db, {
    autoCreate: true,
    autoIndex: true,
    appName: 'Natours',
    connectTimeoutMS: 10000,
    auth: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    dbName: process.env.DATABASE_NAME,
  })
  .then((con) => {
    console.log(con.connection.readyState);
    // console.log(con.connections);
  });

app.listen(process.env.PORT, () => {
  console.log(`Listening to server on port ${process.env.PORT}`);
});
