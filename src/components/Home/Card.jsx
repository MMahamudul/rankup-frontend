import { Link } from "react-router";
import { format } from "date-fns";
import { SlPeople, SlUser } from "react-icons/sl";

const Card = ({ contest }) => {
  const { _id, image, name, price, prize, category, deadline, participant } =
    contest;

  const participantCount =
    typeof participant === "number" && !isNaN(participant) ? participant : 0;

  return (
    <Link
      to={`/contest/${_id}`}
      className="
        group bg-white rounded-xl border border-gray-100
        hover:border-blue-200 hover:shadow-lg
        transition-all duration-300
        flex flex-col overflow-hidden
      "
    >
      {/* IMAGE */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col gap-2 text-sm">
        {/* TITLE */}
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {name}
        </h3>

        {/* DEADLINE */}
        <p className="text-gray-500">
          Deadline:{" "}
          <span className="text-gray-800 font-medium">
            {deadline ? format(new Date(deadline), "dd MMM yy") : "N/A"}
          </span>
        </p>

        {/* PRICE + PRIZE */}
        <div className="flex justify-between text-gray-700 font-medium">
          <span>
            Entry <span className="text-blue-600">${price}</span>
          </span>
          <span>
            Prize <span className="text-blue-600">${prize}</span>
          </span>
        </div>

        {/* PARTICIPANTS */}
        <p className="text-gray-600 flex items-center gap-2">
  {participantCount > 0 ? (
    <span className="flex items-center gap-1 text-blue-800 font-medium">
      {participantCount === 1 ? (
        <SlUser className="text-blue-800 text-lg" />
      ) : (
        <SlPeople className="text-blue-800 text-lg" />
      )}
      {participantCount}{" "}
      {participantCount === 1 ? "participant" : "participants"}
    </span>
  ) : (
    <span className="text-gray-400">No participants yet</span>
  )}
</p>

        {/* CTA */}
        <button
          className="
            mt-2 text-sm font-semibold
            text-blue-600 border border-blue-600
            rounded-md py-1.5
            hover:bg-blue-600 hover:text-white
            transition
          "
        >
          View Contest →
        </button>
      </div>
    </Link>
  );
};

export default Card;
