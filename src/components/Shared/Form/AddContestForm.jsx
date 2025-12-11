import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { imageUpload } from '../../../utils';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loading from '../Loading';
import ErrorPage from '../../../pages/ErrorPage';

const AddContestForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/add-contest`,
        payload
      ),
    onSuccess: (data) => {
      console.log(data);
      toast.success('Contest added successfully!');
      mutationReset();
    },
    onError: () => {
      toast.error('Failed to add contest. Please try again.');
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      name,
      description,
      instruction,
      category,
      price,
      prize,
      deadline,
      image,
    } = data;

    const imageFile = image[0];

    try {
      // 1. Upload image
      const imageURL = await imageUpload(imageFile);

      // 2. Prepare contest payload
      const contestData = {
        image: imageURL,
        name,
        description,
        instruction,
        category,
        price: Number(price),
        prize: Number(prize),

        // IMPORTANT: participant always starts from 0.
        // It will be increased only from payment-success backend.
        participant: 0,

        // react-datepicker gives a Date object
        deadline: deadline ? deadline.toISOString() : null,
        creator: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      // 3. Send to backend
      await mutateAsync(contestData);

      // 4. Reset form
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while creating contest.');
    }
  };

  if (isPending) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create a New Contest
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Contest Name"
                className={`w-full px-4 py-3 text-gray-800 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-blue-300'
                }`}
                {...register('name', {
                  required: 'Contest name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters',
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label
                htmlFor="category"
                className="block text-gray-600 font-medium"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className={`w-full px-4 py-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-blue-300'
                }`}
                {...register('category', {
                  required: 'Category is required',
                })}
              >
                <option value="">Select a category</option>
                <option value="Photography">Photography</option>
                <option value="Coding">Coding</option>
                <option value="Gaming">Gaming</option>
                <option value="Performance">Performance</option>
                <option value="Business">Business</option>
                <option value="Social">Social Media Influence</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label
                htmlFor="description"
                className="block text-gray-600 font-medium"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                placeholder="Write contest description here..."
                className={`block rounded-md w-full h-32 px-4 py-3 text-gray-800 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-blue-300'
                }`}
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description should be at least 10 characters',
                  },
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Task Instruction */}
            <div className="space-y-1 text-sm">
              <label
                htmlFor="instruction"
                className="block text-gray-600 font-medium"
              >
                Task Instruction <span className="text-red-500">*</span>
              </label>
              <textarea
                id="instruction"
                placeholder="Write detailed task instructions here..."
                className={`block rounded-md w-full h-32 px-4 py-3 text-gray-800 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.instruction ? 'border-red-500' : 'border-blue-300'
                }`}
                {...register('instruction', {
                  required: 'Instruction is required',
                  minLength: {
                    value: 10,
                    message: 'Instruction should be at least 10 characters',
                  },
                })}
              ></textarea>
              {errors.instruction && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.instruction.message}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 flex flex-col">
            {/* Price, Prize, Deadline */}
            <div className="flex flex-col md:flex-row justify-between gap-3">
              {/* Price */}
              <div className="space-y-1 text-sm w-full">
                <label
                  htmlFor="price"
                  className="block text-gray-600 font-medium"
                >
                  Entry Fee <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Entry fee"
                  className={`w-full px-4 py-3 text-gray-800 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-blue-300'
                  }`}
                  {...register('price', {
                    required: 'Entry fee is required',
                    min: {
                      value: 0,
                      message: 'Price cannot be negative',
                    },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Prize */}
              <div className="space-y-1 text-sm w-full">
                <label
                  htmlFor="prize"
                  className="block text-gray-600 font-medium"
                >
                  Total Prize <span className="text-red-500">*</span>
                </label>
                <input
                  id="prize"
                  type="number"
                  placeholder="Total prize"
                  className={`w-full px-4 py-3 text-gray-800 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.prize ? 'border-red-500' : 'border-blue-300'
                  }`}
                  {...register('prize', {
                    required: 'Prize amount is required',
                    min: {
                      value: 0,
                      message: 'Prize cannot be negative',
                    },
                  })}
                />
                {errors.prize && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.prize.message}
                  </p>
                )}
              </div>

              {/* Deadline (React DatePicker) */}
              <div className="space-y-1 text-sm w-full">
                <label
                  htmlFor="deadline"
                  className="block text-gray-600 font-medium"
                >
                  Deadline <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="deadline"
                  rules={{ required: 'Deadline is required' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      placeholderText="Select a deadline"
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      showPopperArrow={false}
                      className={`w-full px-4 py-3 text-gray-800 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.deadline ? 'border-red-500' : 'border-blue-300'
                      }`}
                    />
                  )}
                />
                {errors.deadline && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="p-4 w-full m-auto rounded-lg grow bg-gray-50 border border-dashed border-gray-300">
              <div className="file_upload px-5 py-3 relative rounded-lg">
                <div className="flex flex-col items-center text-center gap-2">
                  <p className="text-sm text-gray-600 mb-1">
                    Upload a cover image for your contest
                  </p>
                  <label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="text-sm cursor-pointer w-36 hidden"
                      {...register('image', {
                        required: 'Image is required',
                      })}
                    />
                    <div className="bg-blue-800 text-white border border-gray-300 rounded font-semibold cursor-pointer px-4 py-2 hover:bg-blue-950 transition">
                      Choose Image
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded-xl shadow-md bg-blue-800 hover:bg-blue-950 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save & Continue'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContestForm;
