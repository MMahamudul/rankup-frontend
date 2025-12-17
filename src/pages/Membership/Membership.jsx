// pages/Membership.jsx
import { FaCheckCircle, FaCrown } from "react-icons/fa";

const Membership = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-1">
      <h1 className="md:text-4xl  text-center text-blue-900 text-3xl font-bold">
        Membership Plans
      </h1>
      <p className="mt-3 text-center text-blue-600 max-w-2xl mx-auto">
        Unlock premium features and boost your chances of success.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free */}
        <PlanCard
          title="Free"
          price="$0"
          features={[
            "Join contests",
            "Basic profile",
            "Limited submissions",
          ]}
        />

        {/* Premium */}
        <PlanCard
          title="Pro Member"
          price="$19 / month"
          highlight
          features={[
            "Unlimited contest participation",
            "Priority submissions",
            "Featured profile",
            "Exclusive contests",
          ]}
        />
      </div>
    </div>
  );
};

const PlanCard = ({ title, price, features, highlight }) => (
  <div
    className={`rounded-2xl p-8 border ${
      highlight
        ? "bg-blue-600 text-white scale-105"
        : "bg-white text-gray-900"
    }`}
  >
    <div className="flex items-center gap-2">
      <h3 className="text-xl font-bold">{title}</h3>
      {highlight && <FaCrown />}
    </div>

    <p className="mt-4 text-3xl font-extrabold">{price}</p>

    <ul className="mt-6 space-y-3 text-sm">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2">
          <FaCheckCircle className="opacity-80" /> {f}
        </li>
      ))}
    </ul>

    <button
      className={`mt-8 w-full py-2 rounded-xl font-semibold ${
        highlight
          ? "bg-white text-blue-600 hover:bg-gray-100"
          : "border border-blue-600 text-blue-600 hover:bg-blue-50"
      }`}
    >
      Choose Plan
    </button>
  </div>
);

export default Membership;
