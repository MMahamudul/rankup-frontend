import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { SlPeople } from "react-icons/sl";


const PopularContestCard = ({ contest }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    _id,
    name,
    image,
    description,
    participant,
    category,
    price,
  } = contest;

  const handleDetails = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/contest/${_id}`);
    }
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition duration-300 flex flex-col">
      
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        {/* CATEGORY BADGE */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {name}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          {description?.length > 90
            ? description.slice(0, 90) + "..."
            : description}
        </p>

        {/* INFO */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2 text-blue-950">
            <SlPeople size={20} className="text-blue-800 font-bold "/> <span>{participant || 0} Joined</span>
          </div>
          {price && <span> $ {price}</span>}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleDetails}
          className="mt-auto w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PopularContestCard;

