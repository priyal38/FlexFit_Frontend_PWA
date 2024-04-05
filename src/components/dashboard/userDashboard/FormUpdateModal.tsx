import React, { useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';
import toast , { Toaster } from 'react-hot-toast';
import { UserWorkoutData } from '../../../pages/user/userDashboard/UserHome';


type Props = {
    handleCloseEditModal: () => void;
    workoutData: UserWorkoutData | null
};


interface Formdata {
    title:string
    targetDays:number
    duration:number
    startDate:string
}

const FormUpdateModal = ({ handleCloseEditModal , workoutData }: Props) => {

    const axiosPrivate = useAxiosPrivate()
  const { register, handleSubmit, formState: { errors } , reset } = useForm<Formdata>()

 
  useEffect(() => {
    if (workoutData) {
     
        reset({
            ...workoutData,
            startDate: new Date(workoutData.startDate).toISOString().split('T')[0], 
            title: workoutData.workoutId ? workoutData.workoutId.title : workoutData.title
        });
    } 
}, [workoutData]);

  const onSubmit = async (formData: any) => {
    try {
        // formData.startDate = new Date(formData.startDate); 
        console.log(formData)
      const response = await axiosPrivate.put(`/progress/updatetabledata/${workoutData?._id}`, formData);
        console.log(response)
        if(response.status===200){
            toast.success("workout updated successfully")
            
          }
          
          handleCloseEditModal();
          
        } catch (error) {
          console.error('Error adding workout:', error);
         toast.error("Please try again")
        }
};



    return (
        <div className="fixed top-5 md:left-10 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="bg-surface-200 rounded-lg shadow-inner  shadow-slate-300 w-full max-w-md">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-white">Update workout</h3>
                    <button
                        type="button"
                        className="text-gray-200 bg-transparent hover:bg-purple-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                        onClick={handleCloseEditModal}
                    >
                       <IoMdClose className='h-7 w-7'/>
                     
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Workout Name</label>
                            <input type="text"  className="bg-surface-200  border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   {...register('title' , {
                                required:"title required"
                            })} 
                             disabled={workoutData?.workoutId ? true : false}
                            />
                             {errors.title && <p className="text-red-600 mt-1">{errors.title?.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">TargetDays</label>
                            <input type="number"  className="bg-surface-200  border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   {...register('targetDays' , {
                                required:"targetdays required",
                                min:"1"
                            })} />
                             {errors.targetDays && <p className="text-red-600 mt-1">{errors.targetDays?.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Duration</label>
                            <input type="number" className="bg-surface-200 border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   {...register('duration' , {
                                required:"duration required",
                                min:"1"
                            })} />
                             {errors.duration && <p className="text-red-600 mt-1">{errors.duration?.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">StartDate</label>
                            <input type="date"  className="bg-surface-200 border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" {...register('startDate' , {
                                required:"startDate required",
                                // valueAsDate: true
                            })} />
                              {errors.startDate && <p className="text-red-600 mt-1">{errors.startDate?.message}</p>}
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-md tracking-wider  px-5 py-2.5 text-center">Save</button>
                    </form>
                </div>
            </div>
          
        </div>
        
    );
};

export default FormUpdateModal;
