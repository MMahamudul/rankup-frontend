const blogs = [
  {
    title: "How to Win Online Contests",
    date: "Jan 10, 2026",
    image:"https://i.ibb.co/1GS2pJMk/Essay-on-Competition.webp"
  },
  {
    title: "Top 10 Creative Contest Ideas",
    date: "Feb 02, 2026",
    image:"https://i.ibb.co/1Y5VWdHZ/article-2.webp"
  },
  {
    title: "Why Skill-Based Contests Matter",
    date: "Mar 15, 2026",
    image:"https://i.ibb.co/GfMDkWWS/article.jpg"
  },
];



const Blogs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-4xl text-blue-900 font-bold text-center mb-12">
          Latest Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white  rounded-xl shadow"
            >
                <img className="w-full h-50 object-cover rounded-t-2xl" src={blog.image} alt="article" />
              <h3 className="text-xl text-blue-800 font-semibold my-1 p-6">
                {blog.title}
              </h3>
              <p className="text-blue-500 p-6 font-bold text-sm">{blog.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
