import mongoose from 'mongoose';

export const Budget = mongoose.model(
  'Budget',
  mongoose.Schema(
    {
      text: {
        type: String,
        required: [true, 'Please add a text value (schema)'],
      },
    },
    {
      timestamps: true,
    }
  )
);
