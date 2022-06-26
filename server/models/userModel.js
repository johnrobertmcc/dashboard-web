import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You're not me tf"],
    },
    email: {
      type: String,
      required: [true, "This isn't my email tho?"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Yo who tf are you????'],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', UserSchema);
