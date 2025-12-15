import { useState } from "react";
import UpdateContestModal from "../Modals/UpdateContestModal";
import DeleteModal from "../Modals/DeleteModal";
import { useNavigate } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ContestDataRow = ({ program }) => {
  const { _id, image, name, price, category, status } = program;
  const navigate = useNavigate();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <img
          alt="contest"
          src={image}
          className="mx-auto object-cover rounded h-10 w-15"
        />
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{name}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{category}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">${price}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{status}</p>
      </td>

      {/* Submissions */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
            <button
              onClick={openDeleteModal}
              className="inline-flex items-center justify-center text-red-500 hover:text-red-700"
              title="Delete"
            >
              <FaTrashAlt size={18} />
            </button>

            <DeleteModal
              isOpen={isDeleteOpen}
              closeModal={closeDeleteModal}
              contestId={_id}   // ✅ REQUIRED
            />
          </>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>

      {/* Update (only pending) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {status === "pending" ? (
          <>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center justify-center text-green-500 hover:text-green-700"
              title="Edit"
            >
              <FaEdit size={20} />
            </button>

            <UpdateContestModal
              isOpen={isEditModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              contest={program}
            />
          </>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
    </tr>
  );
};

export default ContestDataRow;
