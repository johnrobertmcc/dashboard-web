import mongoose from 'mongoose';

/**
 * Connect to the MongoDB database.
 */
export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URI);
    console.log(`MongoDB Connected: ${conn?.connection?.host}`.bold);
  } catch (e) {
    console.error('ERROR: ', e.message);
    process.exit(1);
  }
}
