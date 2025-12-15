import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";

const UpdateContestForm = ({ contest, onUpdate, isSubmitting: apiLoading }) => {
  const [selectedFileName, setSelectedFileName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: formSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      category: "Photography",
      description: "",
      price: "",
      prize: "",
      image: null,
    },
  });

  // Fill form when contest data arrives / changes
  useEffect(() => {
    if (!contest) return;

    reset({
      name: contest?.name || "",
      category: contest?.category || "Photography",
      description: contest?.description || "",
      price: contest?.price ?? "",
      prize: contest?.prize ?? "",
      image: null, // file input can't be prefilled
    });

    setSelectedFileName("");
  }, [contest, reset]);

  const onSubmit = async (data) => {
    try {
      const imageFile = data?.image?.[0] || null;

      // prepare payload
      const payload = {
        name: data.name,
        category: data.category,
        description: data.description,
        price: Number(data.price),
        prize: Number(data.prize),
      };

      //  if a new image selected, upload then set image url
      if (imageFile) {
        const imageURL = await imageUpload(imageFile);
        payload.image = imageURL;
      }

      await onUpdate(payload);
    } catch (err) {
      toast.error(err?.message || "Failed to prepare update");
    }
  };

  const disabled = apiLoading || formSubmitting;

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-900 rounded-md bg-white"
                id="name"
                type="text"
                placeholder="Contest Name"
                {...register("name", { required: true })}
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                id="category"
                className="w-full px-4 py-3 border border-blue-500 focus:outline-blue-900 rounded-md bg-white"
                {...register("category", { required: true })}
              >
                <option value="Photography">Photography</option>
                <option value="Coding">Coding</option>
                <option value="Gaming">Gaming</option>
                <option value="Designing">Designing</option>
                <option value="Business">Business</option>
                <option value="Writing">Writing</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write contest description here..."
                className="block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-blue-500 bg-white focus:outline-blue-900"
                {...register("description")}
              />
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Price & Prize */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-900 rounded-md bg-white"
                  id="price"
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: true, min: 0 })}
                />
              </div>

              {/* Prize */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="prize" className="block text-gray-600">
                  Prize
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-900 rounded-md bg-white"
                  id="prize"
                  type="number"
                  placeholder="Total Prize"
                  {...register("prize", { required: true, min: 0 })}
                />
              </div>
            </div>

            {/* Image */}
            <div className="p-4 w-full m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center gap-2">
                  {selectedFileName ? (
                    <p className="text-xs text-green-700 font-medium">
                       {selectedFileName}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      No new image selected (current stays)
                    </p>
                  )}

                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setSelectedFileName(file ? file.name : "");
                      }}
                    />
                    <div className="bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-blue-900">
                      Upload New Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={disabled}
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {disabled ? "Updating..." : "Update Contest"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateContestForm;
