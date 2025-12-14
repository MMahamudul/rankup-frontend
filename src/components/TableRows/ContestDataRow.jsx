import { useState } from "react";
import UpdateContestModal from "../Modals/UpdateContestModal";
import DeleteModal from "../Modals/DeleteModal";
import { useNavigate } from "react-router";

const ContestDataRow = ({ program }) => {
  const { _id, image, name, price, category, status } = program;
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{status}</p>
      </td>
       {/* Submissions button */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => navigate(`/dashboard/submissions/${_id}`)}
          className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200"
        >
          See Submissions
        </button>
      </td>

      {/* Delete (only pending) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {status === "pending" ? (
          <>
            <span
              onClick={openModal}
              className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
            >
              <span className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
              <span className="relative">Delete</span>
            </span>
            <DeleteModal isOpen={isOpen} closeModal={closeModal} />
          </>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>

      {/* Update (only pending) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {status === "pending" ? (
          <span
            onClick={() => setIsEditModalOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
            <span className="relative">Update</span>
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        )}

        <UpdateContestModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  );
};

export default ContestDataRow;
