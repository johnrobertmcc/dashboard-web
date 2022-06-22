import mongoose from 'mongoose';

const BudgetItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: [true, 'Please add an item.'],
    },
    event: { type: String },
    amount: { type: mongoose.Decimal128 },
  },
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model('Budget', BudgetItemSchema);
