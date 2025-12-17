
import { FaEnvelope, FaQuestionCircle, FaLifeRing } from "react-icons/fa";

const Support = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className=" md:text-4xl text-blue-900 text-3xl font-bold text-center">
        Support Center
      </h1>
      <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
        Need help? We’re here to assist you with contests, payments, or any
        platform-related issues.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <SupportCard
          icon={<FaQuestionCircle />}
          title="FAQs"
          desc="Find answers to the most common questions about contests and prizes."
        />

        <SupportCard
          icon={<FaEnvelope />}
          title="Email Support"
          desc="Reach out to our team directly for personalized help."
        />

        <SupportCard
          icon={<FaLifeRing />}
          title="24/7 Assistance"
          desc="We ensure continuous support for creators and participants."
        />
      </div>

      {/* Contact Box */}
      <div className="mt-16 bg-gray-100 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900">
          Still need help?
        </h3>
        <p className="mt-2 text-gray-600">
          Email us at{" "}
          <span className="font-medium text-blue-600">
            support@rankup.com
          </span>
        </p>
      </div>
    </div>
  );
};

const SupportCard = ({ icon, title, desc }) => (
  <div className="rounded-2xl bg-white p-6 shadow hover:shadow-md transition text-center">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl">
      {icon}
    </div>
    <h3 className="font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{desc}</p>
  </div>
);

export default Support;
