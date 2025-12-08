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
  const {isPending,
         isError,
         mutateAsync,
         reset :mutationReset } = useMutation({
            mutationFn: async payload =>
            axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/add-contest`,
        payload
      ),
      onSuccess: data =>{
        console.log(data)
        toast.success('Contest Added Successfully!!!');
        mutationReset();
      }   
                
         })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
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
      const imageURL = await imageUpload(imageFile);

      const contestData = {
        image: imageURL,
        name,
        description,
        instruction,
        category,
        price: Number(price),
        prize: Number(prize),
        // react-datepicker gives a Date object
        deadline: deadline ? deadline.toISOString() : null,
        creator: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(contestData)
      /* const { data: response } = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/add-contest`,
        contestData
      );
      console.log(response); */
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  
  if(isPending) return <Loading></Loading>
  if(isError) return <ErrorPage></ErrorPage>


  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Contest Name"
                className="w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-600 rounded-md bg-white"
                {...register('name', {
                  required: 'Enter name correctly',
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                id="category"
                className="w-full px-4 py-3 border border-blue-500 focus:outline-blue-600 rounded-md bg-white"
                {...register('category', {
                  required: 'Enter category correctly',
                })}
              >
                <option value="Photography">Photography</option>
                <option value="Coding">Coding</option>
                <option value="Gaming">Gaming</option>
                <option value="Performance">Performance</option>
                <option value="Business">Business</option>
                <option value="Social">Social Media Influence</option>
              </select>
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Write contest description here..."
                className="block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-blue-500 bg-white focus:outline-blue-600"
                {...register('description', {
                  required: 'Enter description correctly',
                })}
              ></textarea>
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}

            {/* Task Instruction */}
            <div className="space-y-1 text-sm">
              <label htmlFor="instruction" className="block text-gray-600">
                Task Instruction
              </label>

              <textarea
                id="instruction"
                placeholder="Write detailed task instructions here..."
                className="block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-blue-500 bg-white focus:outline-blue-600"
                {...register('instruction', {
                  required: 'Enter instruction carefully',
                })}
              ></textarea>
            </div>
            {errors.instruction && (
              <p className="text-red-500 text-sm">
                {errors.instruction.message}
              </p>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 flex flex-col">
            {/* Price, Prize, Deadline */}
            <div className="flex flex-col md:flex-row justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Entry fee"
                  className="w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-600 rounded-md bg-white"
                  {...register('price', {
                    required: 'Enter price correctly',
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Prize */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="prize" className="block text-gray-600">
                  Prize
                </label>
                <input
                  id="prize"
                  type="number"
                  placeholder="Total Prize"
                  className="w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-600 rounded-md bg-white"
                  {...register('prize', {
                    required: 'Enter prize correctly',
                  })}
                />
                {errors.prize && (
                  <p className="text-red-500 text-sm">
                    {errors.prize.message}
                  </p>
                )}
              </div>

              {/* Deadline (React DatePicker) */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="deadline" className="block text-gray-600">
                  Deadline
                </label>
                <Controller
                  control={control}
                  name="deadline"
                  rules={{ required: 'Enter deadline correctly' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      placeholderText="Select a deadline"
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      showPopperArrow={false}
                      className="w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-600 rounded-md bg-white"
                    />
                  )}
                />
                {errors.deadline && (
                  <p className="text-red-500 text-sm">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="p-4 w-full m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="text-sm cursor-pointer w-36 hidden"
                      {...register('image', {
                        required: 'Upload an image',
                      })}
                    />
                    <div className="bg-blue-800 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-950">
                      Upload
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-800 hover:bg-blue-950"
            >
              Save &amp; Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContestForm;
