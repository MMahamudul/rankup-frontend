const testimonials = [
  {
    name: "Kabir Khan",
    comment:
      "This platform helped me gain recognition for my photography!",
      img:"https://i.ibb.co/Y4VyKD7X/pro-5.jpg"
  },
  {
    name: "Sarah Khan",
    comment:
      "Smooth experience and fair judging. Highly recommended!",
      img:"https://i.ibb.co/B5742vVF/pro-2.jpg"
  },
  {
    name: "Akil Rahman",
    comment:
      "Amazing contests with real rewards. Loved it!",
      img:"https://i.ibb.co/cKZBLnNL/pro-1.jpg"
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          What Participants Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-8 border rounded-xl shadow-sm"
            >
                <img className="rounded-full w-22 h-22 my-4 mx-auto" src={t.img} alt="" />
              <p className="text-gray-600 mb-4">“{t.comment}”</p>
              <h4 className="font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
