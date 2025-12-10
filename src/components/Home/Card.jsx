import { Link } from "react-router";
import { format } from "date-fns";

const Card = ({ contest }) => {
  const { _id, image, name, price, prize, category, deadline } = contest;

  return (
    <Link
      to={`/contest/${_id}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-square overflow-hidden">
        <img
          className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
          src={image}
          alt="Event"
        />

        {/* CATEGORY BADGE */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white shadow">
          {category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3">
        {/* TITLE */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
          {name}
        </h3>

        {/* DEADLINE */}
        <p className="text-sm text-gray-600 flex items-center gap-1">
          ⏳ Deadline:
          <span className="font-medium text-gray-800">
            {deadline ? format(new Date(deadline), "MMMM do, yyyy") : "N/A"}
          </span>
        </p>

        {/* PRICE & PRIZE */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm font-semibold text-gray-700">
            Entry:
            <span className="text-blue-600 ml-1">${price}</span>
          </div>

          <div className="text-sm font-semibold text-gray-700">
            Prize:
            <span className="text-green-600 ml-1">${prize}</span>
          </div>
        </div>

        {/* CTA BUTTON */}
        <button
          className="
            mt-3 w-full py-2 rounded-lg text-sm font-semibold
            bg-blue-600 text-white
            hover:bg-blue-700 transition
          "
        >
          View Contest →
        </button>
      </div>
    </Link>
  );
};

export default Card;
