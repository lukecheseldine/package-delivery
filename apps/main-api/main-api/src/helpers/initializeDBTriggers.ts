import mongoose from 'mongoose';

export const initializeDBTriggers = (db: mongoose.Connection) => {
  db.on('connected', () => {
    console.log(
      `Connected to MongoDB at ${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}`
    );
  });

  db.on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

  db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
};
