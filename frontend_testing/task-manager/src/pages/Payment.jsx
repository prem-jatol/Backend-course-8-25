import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const [amount, setAmount] = useState(500);
    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            // 1. Create order from backend
            const { data } = await axios.post('http://localhost:4080/api/payment/order', { amount }, { withCredentials: true });

            // 2. Razorpay options
            const options = {
                key: "rzp_test_RJvWENOQyevOEj", // from dashboard
                amount: data.amount,
                currency: data.currency,
                name: "Task Manager",
                description: "Test Transaction",
                order_id: data.id,
                handler: async function (response) {
                    // 3. Verify payment on backend
                    const res = await axios.post("http://localhost:4080/api/payment/verify", response, { withCredentials: true });

                    if (res.data.success) {
                        // Redirect after success ✅
                        navigate(`/payment-success?orderId=${res.data.orderId}&paymentId=${res.data.paymentId}`);
                    } else {
                        alert("Payment verification failed!");
                    }
                },
                prefill: {
                    name: "Prem Jatol",
                    email: "prem@example.com",
                    contact: "9876543210",
                },
                theme: { color: "#fbff09ff" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
                <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    placeholder="Enter amount"
                />
                <button
                    onClick={handlePayment}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition"
                >
                    Pay ₹{amount}
                </button>
            </div>
        </div>
    );
}
