import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';
import { FiCamera, FiTrash } from 'react-icons/fi';
import defaultuser from '../../../images/defaultUser.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

interface Props {
    profilePhoto: string;
    onPhotoUpdateSuccess: () => void;
}

const UpdateProfilePhoto = ({ profilePhoto, onPhotoUpdateSuccess }: Props) => {

    

    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const axiosPrivate = useAxiosPrivate();
const {auth , setAuth} = useAuth()


    const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file);

        if (file) {
            setSelectedPhoto(file);
           

            // Call onSubmitPhoto with the updated photo
            await onSubmitPhoto(file);
        }
    };
    const onSubmitPhoto = async (selectedPhoto: File) => {
        if (!selectedPhoto) return;
        console.log(selectedPhoto);

        try {
            const formData = new FormData();
            formData.append('profilePhoto', selectedPhoto);
            const response = await axiosPrivate.put('/user/uploadphoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });



            if (response.status === 200) {
                const profileImage = response.data.data.profilePhoto
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                const updatedUserData = {
                    ...userData,
                    image: profileImage
                  };
                  localStorage.setItem('user', JSON.stringify(updatedUserData));

                  setAuth({
                    user: {
                      ...auth.user,
                      image: profileImage
                    }
                  });


                onPhotoUpdateSuccess();
                toast.success("Profile image updated  successfully")

            }
            else {
                toast.error("Please try again")
            }

          
        } catch (error) {
            console.error('Error updating user photo:', error);
            toast.error("Please try again")
        }
    };

    const handleDeleteImage = async () => {
        try {
            // Send request to delete the profile photo
            const response = await axiosPrivate.delete('/user/deletephoto');

            if (response.status === 200) {
                // Update user data in localStorage and context
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                const updatedUserData = {
                    ...userData,
                    image: ''
                };
                localStorage.setItem('user', JSON.stringify(updatedUserData));
                setAuth({
                    user: {
                        ...auth.user,
                        image: ''
                    }
                });

                onPhotoUpdateSuccess();
                toast.success("Profile image deleted successfully");
            } else {
                toast.error("Please try again");
            }
        } catch (error) {
            console.error('Error deleting user photo:', error);
            toast.error("Please try again");
        }
    };

    return (
        <div className="col-span-5 xl:col-span-2">
            <div className="rounded-lg border border-surface-300 bg-surface-200 shadow-md">
                <div className="border-b border-surface-300 py-4 px-7">
                    <h3 className="font-medium text-white">Profile Picture</h3>
                </div>
                <div className="p-7">
                    <div className="mb-4 gap-3">

                        <img
                            className="h-32 w-32 rounded-full border-4 border-surface-300 mx-auto my-4"
                            src={profilePhoto ? `http://localhost:5000/${profilePhoto}` : defaultuser}
                            alt=""
                        />

                        <div>
                            <p className="text-white text-sm text-center">Upload/Change Your Profile Image</p>



                            <label
                                htmlFor="cover"
                                className="flex cursor-pointer mt-4 items-center justify-center gap-3 rounded bg-primary-400 py-2 px-2 text-sm font-medium text-white hover:bg-opacity-90 xs:px-4"
                            >
                                <input type="file" name="cover" id="cover" onChange={handleFileInputChange} className="sr-only" />
                                <span>
                                    <FiCamera size={20} />
                                </span>
                                <span className='tracking-wide'>Upload Image</span>
                            </label>


                            {profilePhoto && (
                                <button
                                    onClick={handleDeleteImage}
                                    className="mt-4 block  py-1.5 px-4 rounded bg-red-500 text-white text-sm  hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                >
                                    <FiTrash className="inline-block mr-2" />
                                    <span>Delete Image</span>
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default UpdateProfilePhoto;
