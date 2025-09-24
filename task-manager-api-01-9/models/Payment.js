const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  currency: String,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Payment", paymentSchema);
