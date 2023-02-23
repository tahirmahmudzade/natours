const mongoose = require('mongoose');

const app = require('./app');

const PORT = 3000;
console.log(process.env.NODE_ENV);
mongoose
  .connect(
    `mongodb+srv://tonymahmood:tabacaba123@tahirdb.pzqodes.mongodb.net/natours`,
    {
      autoIndex: true,
      autoCreate: true,
      user: 'tonymahmood',
      pass: 'tabacaba123',
      dbName: 'natours',
    }
  )
  .then((con) => {
    console.log(con.connection.readyState);
  });

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to server on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
