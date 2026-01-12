const Newsletter = () => {
  return (
    <section className="py-20  bg-linear-to-r from-blue-100 to-blue-300 text-blue-900 ">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Stay Updated
        </h2>
        <p className="mb-8 text-blue-800">
          Get latest contests and updates directly to your inbox.
        </p>

        <form className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded text-gray-800 border-blue-600 border-2"
          />
          <button className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
