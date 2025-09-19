const Payment = mongoose.model("Payment", new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  currency: String,
  status: { type: String, default: "pending" }
}));

module.exports = mongoose.model("Payment", PaymentSchema);