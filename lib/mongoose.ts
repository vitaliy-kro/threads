import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    return console.log('MONGODB_URL not found');
  }

  if (isConnected) {
    return console.log('MongoDB is already connected');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: 'threads' });

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log(e);
  }
};
