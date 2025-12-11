// PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router"; 
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
          setMessage("Payment verified and your spot in the contest is secured!");
        } else {
          setStatus("error");
          setMessage(data.message || "Payment verification failed.");
        }
      } catch (err) {
        console.error("Payment success error:", err);
        const apiMessage = err.response?.data?.message;

        setStatus("error");
        setMessage(
          apiMessage || "Something went wrong verifying your payment."
        );
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      /* setStatus("error");
      setMessage("No payment session found. Please return to the contest page."); */
    }
  }, [location.search]);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center border border-blue-50">
        {/* ICON */}
        <div className="flex justify-center mb-4">
          {isLoading && (
            <div className="h-14 w-14 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
          )}

          {isSuccess && (
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center shadow-inner">
              <svg
                className="h-10 w-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75l2.25 2.25L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}

          {isError && (
            <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center shadow-inner">
              <svg
                className="h-10 w-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M12 21a9 9 0 100-18 9 9 0 000 18z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* TITLE */}
        {isLoading && (
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Verifying your payment...
          </h2>
        )}

        {isSuccess && (
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful
          </h2>
        )}

        {isError && (
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            Something went wrong
          </h2>
        )}

        {/* MESSAGE */}
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

        {/* EXTRA INFO ON SUCCESS */}
        {isSuccess && (
          <p className="text-sm text-gray-500 mb-6">
            You will receive a confirmation email shortly with your contest details.
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/contests"
            className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
          >
            Browse More Contests
          </Link>

          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Go to Home
          </Link>
        </div>

        {/* SMALL FOOTER NOTE */}
        <p className="mt-6 text-xs text-gray-400">
          If you think something is wrong with your payment, please contact support.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
