import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I join a contest?",
    answer:
      "Sign up on the platform, browse available contests, and click 'Participate' on your chosen contest.",
  },
  {
    question: "Are contests free?",
    answer:
      "Some contests are free to join, while others may require a small entry fee. Details are listed on each contest page.",
  },
  {
    question: "How do I receive rewards?",
    answer:
      "Rewards are securely transferred to your registered account after the contest is completed and results are announced.",
  },
  {
    question: "Can I participate from any country?",
    answer:
      "Yes! Our contests are global, and participants from any country are welcome to join.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl bg-white shadow hover:shadow-lg transition duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="font-semibold text-blue-800">{faq.question}</span>
                <span className="text-blue-600">
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-blue-700 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
