import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateContestForm from "../Shared/Form/UpdateContestForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateContestModal = ({ isOpen, setIsEditModalOpen, contest }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutateAsync: updateContest, isPending } = useMutation({
    mutationFn: async (updatedData) => {
      return axiosSecure.patch(`/contests/${contest._id}`, updatedData);
    },
    onSuccess: () => {
      toast.success("Contest updated successfully");
      setIsEditModalOpen(false);

      // ✅ AUTO REFRESH creator contests table
      queryClient.invalidateQueries({ queryKey: ["programs"] });

      // ✅ (optional) refresh contest details cache if you have details page query
      queryClient.invalidateQueries({ queryKey: ["contest", contest._id] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update contest");
    },
  });

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsEditModalOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-2xl bg-white p-6 shadow-xl rounded-2xl duration-300 ease-out"
          >
            {/* Close */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-red-100 px-3 py-1 rounded-md text-red-500 font-semibold"
              >
                ✕
              </button>
            </div>

            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center text-gray-900 mb-4"
            >
              Update Contest Information
            </DialogTitle>

            {/* Pass update fn + loading */}
            <UpdateContestForm
              contest={contest}
              onUpdate={updateContest}
              isSubmitting={isPending}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateContestModal;
