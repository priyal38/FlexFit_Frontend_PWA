import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';
import { MdOutlineEmail } from 'react-icons/md';
import { CiCalendarDate } from "react-icons/ci";
import { GiBodyHeight } from "react-icons/gi";
import { GiWeight } from "react-icons/gi";
import { FiCamera, FiEdit, FiUpload } from "react-icons/fi";
import user from '../../../images/user-06.png'
import { useForm } from 'react-hook-form';
import UpdateProfilePhoto from './UpdateProfileImage';
import toast from 'react-hot-toast';

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  profilePhoto: string;
  height?: number;
  role?: number;
  weight?: number;
  bio:string
}

interface ProfileProps {
  isAdmin: boolean;
}
const UserProfile = ({isAdmin} :ProfileProps ) => {

  const [userData , setUserData] = useState<UserData | null>(null)
const axiosPrivate = useAxiosPrivate()
const { register, handleSubmit, reset, control } = useForm<UserData>({
  defaultValues: {
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    height: 0,
    weight: 0,
   
  }
});




  const getUserProfileData = async() =>{
    try {
      const response = await axiosPrivate.get('/user/profile' )
      console.log(response)
      setUserData(response.data.data) 
      reset(response.data.data)
    } catch (error) {
      console.error('Error fetching workout details:', error);
    }
  }

   useEffect(()=>{
getUserProfileData()
   } , [])

   const handlePhotoUpdateSuccess = () => {
    getUserProfileData(); // Fetch user data again after photo update
  };

   const onSubmitData = async (data: UserData) => {
    try {
      console.log('Updating user profile with data:', data);
    
    const response =   await axiosPrivate.put('/user/updatedata', data);
    console.log(response);
    if(response.status===200){
      toast.success("Profile data updated  successfully")
      
    }
    else{
      toast.error("Please try again")
    }
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error('Please try again')
    }
  };

  const handleCancel = () => {
    if(userData){

      reset(userData); 
      console.log(userData);
      
    }
  };


  return (

    <div className="mx-auto max-w-270">


      <div className="grid grid-cols-5 gap-8">

     <UpdateProfilePhoto profilePhoto = {userData?.profilePhoto as string || ''}  onPhotoUpdateSuccess={handlePhotoUpdateSuccess}/>

        <div className="col-span-5 xl:col-span-3">

          {/* secction 1 */}
          <div className=" border rounded-lg bg-surface-200 shadow-md  border-surface-300">
            <div className="border-b border-surface-300 py-4 px-7 ">
              <h3 className="font-medium text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit(onSubmitData)}>
                <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="fullName"
                    >
                      First Name
                    </label>
                    <div className="relative ">
                      <span className="absolute left-4 top-4 text-gray-400">

                        <FaRegUser className='text-lg' />
                      </span>
                      <input
                        className="w-full rounded border text-[15px] tracking-wider border-surface-300 bg-surface-200 py-3 pl-11 pr-4  focus:ring-surface-500 focus:border-surface-300 text-white "
                        type="text"
                        placeholder='Enter Firstname'
                       
                        {...register("firstname")}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="phoneNumber"
                    >
                      Last Name
                    </label>
                    <div className="relative ">
                      <input
                        className="w-full text-[15px] tracking-wider rounded border border-surface-300 bg-surface-200 py-3 pl-6 pr-4  focus:ring-surface-500 focus:border-surface-300 text-white"
                        type="text"
                        
                        placeholder='Enter lastname'
                      
                        {...register("lastname")} 
                      />
                    </div>

                  </div>
                </div>

                <div className="mb-5">
                  <label
                    className="mb-3 block text-sm font-medium text-white"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-400">
                      <MdOutlineEmail className='text-xl' />
                    </span>
                    <input
                      className="w-full  text-[15px] tracking-wider rounded border border-surface-300 bg-surface-200 py-3 pl-11 pr-4  focus:ring-surface-500 focus:border-surface-300 text-white "
                      type="email"
                    
                      placeholder='Enter your email'
                    
                      {...register("email")} 
                    />
                  </div>
                </div>


                <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                 

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="phoneNumber"
                    >
                      Gender
                    </label>





                    <div className="flex items-center ps-4 border border-surface-300 rounded dark:border-gray-700">
                      <input id="bordered-radio-1" type="radio" value="male" className="w-4 h-4 text-primary-400  focus:ring-primary-300 ring-offset-gray-800 focus:ring-0 bg-surface-300 border-surface-500" {...register('gender')} />
                      <label className="w-full  text-[15px] tracking-wider py-3 ms-2 text-white">Male</label>

                      <input id="bordered-radio-1" type="radio" value="female" className="w-4 h-4 text-primary-400  focus:ring-primary-300 ring-offset-gray-800 focus:ring-0 bg-surface-300 border-surface-500" {...register('gender')} />
                      <label className="w-full py-3 text-[15px] tracking-wider ms-2  text-white">Female</label>
                    </div>



                  </div>
                </div>


{!isAdmin && (
<>

<div className="mb-5 flex flex-col gap-5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-white"

                    >
                      Height(cm)
                    </label>
                    <div className="relative ">
                      <span className="absolute left-4 top-4 text-gray-400">

                        <GiBodyHeight className='text-xl' />
                      </span>
                      <input
                        className="w-full text-[15px] tracking-wider rounded border border-surface-300 bg-surface-200 py-3 pl-11 pr-4  focus:ring-surface-500 focus:border-surface-300 text-white "
                        type="number"
                        
                        placeholder='Enter your height'
                        {...register('height')}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-white"
                      htmlFor="phoneNumber"
                    >
                      Weight(kg)
                    </label>
                    <div className="relative ">
                      <span className="absolute left-4 top-4 text-gray-400">

                        <GiWeight className=' text-xl' />
                      </span>
                      <input
                        className="w-full text-[15px] tracking-wider rounded border border-surface-300 bg-surface-200 py-3 pl-11 pr-4  focus:ring-surface-500 focus:border-surface-300 text-white"
                        type="number"
                       
                        placeholder='Enter your weight'
                       
                        {...register('weight')}
                      />
                    </div>

                  </div>
                </div>


                <div className="mb-5">
                  <label
                    className="mb-3 block text-sm font-medium text-white"

                  >
                    Bio
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-400">
                      <FiEdit className='text-lg' />
                    </span>

                    <textarea
                      className="w-full rounded border text-[15px] tracking-wider font-normal border-surface-300 bg-surface-200 py-3 pl-11 pr-4  focus:ring-surface-500 focus:border-surface-300 text-white "
                      
                      id="bio"
                      rows={6}
                      placeholder="Write your bio here"
                      {...register('bio')}
                    ></textarea>
                  </div>
                </div>

</>
)}
             
                <div className="flex justify-end gap-4">
                  <button
                    className="flex justify-center rounded border border-primary-500 py-2 px-6 font-medium hover:bg-surface-100 text-white"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded  bg-primary-400 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>


        {/* section2 */}
   
      </div>
    </div>

  );
};

export default UserProfile;