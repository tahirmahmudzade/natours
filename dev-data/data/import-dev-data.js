import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
import Tour from '../../model/tourModel.js';
import User from '../../model/userModel.js';
import Review from '../../model/reviewModel.js';

dotenv.config({ path: '../../config.env' });

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

const tours = JSON.parse(fs.readFileSync('tours.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
const reviews = JSON.parse(fs.readFileSync('reviews.json', 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
