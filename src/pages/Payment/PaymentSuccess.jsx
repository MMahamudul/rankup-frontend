// PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/payment-success`,
          { session_id: sessionId }
        );

        if (data.success) {
          setStatus("success");
          setMessage("Payment verified and order created successfully!");
        } else {
          setStatus("failed");
          setMessage(data.message || "Payment verification failed.");
        }
      } catch (err) {
        console.error("Payment success error:", err);
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Something went wrong verifying your payment."
        );
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      /* setStatus("error"); */
      /* setMessage("No session_id found in URL."); */
    }
  }, [location.search]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        {status === "loading" && <p>Verifying payment...</p>}
        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Payment Successful 
            </h2>
            <p className="text-gray-700">{message}</p>
          </>
        )}
        {status !== "loading" && status !== "success" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-700">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
