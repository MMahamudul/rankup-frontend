import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ContestRequestRow = ({ req , refetch}) => {
  const axiosSecure = useAxiosSecure();
  const handleApprovalRequest = async() =>{
  
    try {
       await axiosSecure.patch(`/approve-contests/${req._id}`, {
      status: 'approved', 
    });
    toast.success('Congratulations! Contest Has Been Approved');
    refetch();
    } catch (err) {
      console.log(err)
     /*  `/approve-contests/${req._id}` */
      toast.error(err?.response?.data?.message)
      
    }

  }
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <p className="text-gray-900 font-medium">
              {req?.creator?.email}
            </p>
            <span className="text-xs text-gray-500">
              Pending contest approval
            </span>
          </div>
        </div>
      </td>
      {/* ACTION */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-200 text-yellow-900">
            Pending
          </span>

          <button
            onClick={handleApprovalRequest}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500 text-white hover:bg-blue-900 shadow-sm transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Approve Contest
          </button>
        </div>
      </td>
    </tr>
  );
};
export default ContestRequestRow;