const Payment = require('../models/Payment');
const razorpay = require('../utils/razorpay');
const crypto = require('crypto');

exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const obj = {
            amount: amount * 100, // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(obj);

        // Save order in DB
        const payment = new Payment({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
        await payment.save();

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating order");
    }
}

exports.paymentVerify = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Update DB status
            await Payment.findOneAndUpdate(
                { orderId: razorpay_order_id },
                { paymentId: razorpay_payment_id, signature: razorpay_signature, status: "success" }
            );
            return res.json({ success: true, message: "Payment verified successfully", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
        } else {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error verifying payment");
    }

}