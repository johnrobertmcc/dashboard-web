import mongoose from 'mongoose';

const BudgetItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    item: {
      type: String,
      required: [true, 'Please add an item.'],
    },
    event: { type: String },
    amount: { type: mongoose.Decimal128 },
    date: Date,
    tag: String,
  },
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model('Budget', BudgetItemSchema);
