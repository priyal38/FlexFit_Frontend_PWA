import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';

type Props = {}


interface FormInput {
  title: string;
  category: string;
  content: string[];
  author: string;
  readtime: string;
  coverImg: FileList;
  subtitle: string

}

const UpdateBlog = (props: Props) => {



  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, control, reset } = useForm<FormInput>();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();


  const fetchBlogData = async () => {
    try {
      const response = await axiosPrivate.get(`/blog/getblog/${id}`);
      const data = response.data.data;
      setImage(data.coverImg);
      reset(data);

    } catch (error) {
      console.error('Error fetching workout data:', error);

    }
  };

  const onSubmit = async (data: FormInput) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('content', JSON.stringify(data.content));
      formData.append('author', data.author);
      formData.append('subtitle', data.subtitle);
      formData.append('readtime', data.readtime);

      if (data.coverImg[0]) {
        formData.append('coverImg', data.coverImg[0]);
      }


      const response = await axiosPrivate.put(`/blog/updateblog/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      if (response.status === 200) {
        fetchBlogData();
        toast.success("Blog updated successfully")
      }


    } catch (error) {
      console.error('Error adding workout:', error);
      toast.error("Please try again")
    }
  };


  const handleDelete = async () => {
    try {
      const response = await axiosPrivate.delete(`/blog/deleteblog/${id}`)
      console.log(response);
      if (response) {
        toast.success('Blog deleted successfully');

        navigate(-1)
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Please try again');
    }
  }

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  return (


    <>
      <div className="max-w-2xl  mx-auto mt-10 border bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-surface-200 text-white text-center font-bold uppercase">
          Update Blog
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
              })} />
            {errors.title && <p className="text-red-600 mt-1">{errors.title.message}</p>}
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
              })}>
              <option value="">Select a category</option>
              <option value="fitness">Fitness</option>
              <option value="health">Health</option>
              <option value="mentalHealth">Mental Health</option>
              <option value="nutrition">Nutrition</option>

            </select>
            {errors.category && <p className="text-red-600 mt-1">{errors.category.message}</p>}
          </div>


          {/* ======Author============ */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Author
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" {...register("author", {
                required: "author required"
              })} />
            {errors.author && <p className="text-red-600 mt-1">{errors.author.message}</p>}
          </div>

          {/* ======Author============ */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Subtitle
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" {...register("subtitle")} />

          </div>

          {/* =====================explanation================== */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Content
            </label>
            <Controller
              name="content"
              control={control}
              defaultValue={[""]} // Initial value with an empty string
              render={({ field }) => (
                <>
                  {field.value.map((content: string, index: number) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        {...field}
                        value={content}
                        onChange={(e) => {
                          const newpara = [...field.value];
                          newpara[index] = e.target.value;
                          field.onChange(newpara);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={`Paragraph ${index + 1}`}
                      />
                      {index !== 0 && (
                        <button
                          type="button"
                          className="ml-2 py-2 px-4 bg-red-400 text-white text-sm font-semibold rounded"
                          onClick={() => {
                            const newpara = [...field.value];
                            newpara.splice(index, 1);
                            field.onChange(newpara);
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => field.onChange([...field.value, ''])} // Append a new empty string
                    className="mt-0.5 py-1 px-2 mb-4 bg-green-500 text-white font-semibold text-sm rounded"
                  >
                    Add Paragraph
                  </button>
                </>
              )}
            />
          </div>


          {/* =====================read time================== */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Readtime (Minutes)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" {...register("readtime", {
                required: "readtime required"
              })} />
            {errors.readtime && <p className="text-red-600 mt-1">{errors.readtime.message}</p>}
          </div>



          {/* ============================thumbnailURL================================== */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("coverImg", {

              })} type="file" />


          </div>
          {image && (
            <div className="mb-4 ">
              <label className="block text-gray-700 font-bold mb-2">Current Image</label>
              <div className='h-56'>

                <img
                  src={`http://localhost:5000/${image}`}
                  alt="Current Thumbnail"
                  className=" w-full h-full object-fill "
                />
              </div>
            </div>
          )}


          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-4">
            <button
              className="bg-surface-200 text-white py-2 px-4 rounded hover:bg-surface-200 focus:outline-none focus:shadow-outline"
              type="submit">
              Update Blog
            </button>
            <button
              className="bg-surface-200 text-white py-2 px-4 rounded hover:bg-surface-200 focus:outline-none focus:shadow-outline" type="button" onClick={handleDelete}>
              Delete Blog
            </button>
          </div>

        </form>
      </div>

    </>


  )
}
export default UpdateBlog