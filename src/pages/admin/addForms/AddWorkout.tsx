import axios from 'axios';
import React, { useState  , useEffect} from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';

type Props = {}


interface FormInput {
  title: string;
  category: string;
  subCategory: string;
  explanation: string;
  difficultyLevel: string;
  thumbnail: FileList;
  videoUrl: string;
  equipment:string
}

const AddWorkout = (props: Props) => {

  const { register, handleSubmit, formState: { errors , isSubmitSuccessful } , reset  } = useForm<FormInput>();
  const [subCategories, setSubCategories] = useState<string[]>([])
  const axiosPrivate = useAxiosPrivate();

  const gymCategories = ['Biceps', 'Triceps', 'Chest', 'Back', 'Upperleg', 'Lowerleg', 'Abs', 'Shoulders', 'Glutes', 'Other'];
  const yogaCategories = ['Ashtanga yoga', 'Hatha yoga', 'Hot yoga', 'Iyengar yoga', 'Kundalini yoga', 'Power yoga', 'Restorative yoga', 'Vinyasa yoga', 'Other'];
  const homeWorkoutCategories = ['Stretching', 'Warm Up', 'Other'];

  const categories: { [key: string]: string[] } = {
    gym: gymCategories,
    yoga: yogaCategories,
    home: homeWorkoutCategories
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    const selectedSubCategories = categories[selectedCategory] || [];
    setSubCategories(selectedSubCategories);
  }


  const onSubmit = async (data: FormInput) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('subCategory', data.subCategory);
      formData.append('explanation', data.explanation);
      formData.append('equipment', data.equipment);
      formData.append('difficultyLevel', data.difficultyLevel);
      formData.append('thumbnail', data.thumbnail[0]);
      formData.append('videoUrl', data.videoUrl);

      const response = await axiosPrivate.post('/workout/addworkout', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Workout added successfully")
      }


    } catch (error) {
      console.error('Error adding workout:', error);
      toast.error("Please try again")
    }
  };

  useEffect(()=>{
    if(isSubmitSuccessful){
        reset();
    }
        } , [isSubmitSuccessful ])
  return (


    <>
      <div className="max-w-xl mx-auto mt-10 border  bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-surface-200 text-white text-center font-bold uppercase">
          Add Workout
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" {...register("title", {
                required: "title required"
              })} required />
            {errors.title && <p className="text-red-600 text-xs italic">{errors.title.message}</p>}
          </div>



          {/* ================Category======================== */}
          
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("category", {
                  required: "category required"
                })} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                <option value="gym">Gym</option>
                <option value="home">Home workout</option>
                <option value="yoga">Yoga</option>

              </select>
              {errors.category && <p className="text-red-600 text-xs italic ">{errors.category.message}</p>}
            </div>

          {/* Subcategory */}
           
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Subcategory</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("subCategory", { required: "Subcategory required" })}>
                <option value="">Select a subcategory</option>
                {subCategories.map((subcategory, index) => (
                  <option key={index} value={subcategory}>{subcategory}</option>
                ))}
              </select>
              {errors.subCategory && <p className="text-red-600  text-xs italic">{errors.subCategory.message}</p>}
            </div>
         

            <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
            Equipment
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" {...register("equipment", {
              })}  />
          
          </div>
 {/* ================Difficulty level======================== */}

 <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                Difficulty Level
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("difficultyLevel", {
                  required: "difficulty level required"
                })} >
                <option value="">Select defficulty level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>

              </select>
              {errors.difficultyLevel && <p className="text-red-600  text-xs italic">{errors.difficultyLevel.message}</p>}
            </div>


          {/* =====================explanation================== */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Explanation
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("explanation", {
                required: "explanation required"
              })}></textarea>
            {errors.explanation && <p className="text-red-600  text-xs italic">{errors.explanation.message}</p>}
          </div>

          {/* ============================thumbnailURL================================== */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Thumbnail
            </label>
            <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    {...register("thumbnail", {
      required: "Image is required",
      validate: {
        lessThan10MB: files => files[0]?.size <= 1024 * 1024 ||  "Image size should be less than 1 MB",
        acceptedFormats: files =>
          ['image/jpeg', 'image/png', 'image/gif'].includes(
            files[0]?.type
          ) ||  "Only JPG, JPEG, and PNG file types are allowed",
      },
    })}
    type="file"
  />
            {errors.thumbnail && <p className="text-red-600  text-xs italic">{errors.thumbnail.message}</p>}
          </div>


          {/* ==============================video URL ==================================== */}

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Video URL
            </label>
            <input
              className="shadow appearance-none border br rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("videoUrl", {
                required: "videourl required"
              })} type="text" />
            {errors.videoUrl && <p className="text-red-600  text-xs italic">{errors.videoUrl.message}</p>}
          </div>


          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-surface-200 text-white py-2 px-4 rounded hover:bg-surface-200 focus:outline-none focus:shadow-outline"
              type="submit">
              Add workout
            </button>
          </div>

        </form>
      </div>
     
    </>


  )
}

export default AddWorkout


