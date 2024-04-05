import React, { ChangeEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import imagesignup from '../../images/about.jpg'
import Header from '../../components/LandingPage/Header';
import Footer from '../../components/LandingPage/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const schema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().required('Email is required').matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format'),
    password: yup.string().required('Password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password')], 'Passwords must match')
});

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp = () => {

    let navigate = useNavigate()


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const handleTogglePassword = () => {
        setShowPassword(!showPassword); // Toggle showPassword state
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword); // Toggle showPassword state
    };


    const onSubmit = async (data: FormData) => {

        const { confirmPassword, ...formData } = data;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            console.log(response);
            if (response.status === 200) {
                navigate('/login');
                toast.success('Sign up successful');
            }
        }
        catch (error: any) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                toast.error(error.response.data.message); // Show toast message if username already exists
            }
        }
    }
    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center mt-10">
                <div className="absolute inset-0 z-0">
                    <img src={imagesignup} alt="" className="w-full h-full object-cover opacity-40 brightness-50" />
                </div>
                <div className="relative mx-auto w-full mt-20 max-w-xl">
                    <div className="bg-surface-200 shadow-inner shadow-neutral-200 ml-2 mr-2 rounded-2xl px-8 pt-6 pb-8 mb-4">
                        <div className="text-center">
                            <div className="bg-primary-400 rounded-full inline-block p-2">
                                <LockOutlinedIcon className="h-10 w-10 text-white" />
                            </div>
                            <h2 className="mt-1 text-xl font-medium text-white">Sign up</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-6 mb-4 mt-4 md:grid-cols-2">
                                <div >
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white">First name</label>
                                    <input type="text" id="first_name" {...register('firstname')} className="border text-sm rounded-lg block w-full p-2.5 bg-surface-200 border-gray-600 placeholder-gray-200 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter firstname" />
                                    {errors.firstname && <span className="text-sm text-red-500 italic">{errors.firstname.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-white">Last name</label>
                                    <input type="text" id="last_name" {...register('lastname')} className="text-sm rounded-lg block w-full p-2.5 bg-surface-200  border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter lastname" />
                                    {errors.lastname && <span className="text-sm text-red-500 italic">{errors.lastname.message}</span>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                                <input type="email" id="email" {...register('email')} className="text-sm rounded-lg block w-full p-2.5 bg-surface-200  border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter email" />
                                {errors.email && <span className="text-sm text-red-500 italic">{errors.email.message}</span>}
                            </div>

                            <div className=" mb-4">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>

                                <div className="flex">

                                    <div className='relative w-full'>
                                        <input type={showPassword ? 'text' : 'password'} id="password" {...register('password')} className="border text-sm rounded-lg block w-full p-2.5 bg-surface-200  border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter password" />

                                        {/* Show eye icon in the input field */}
                                        <div className="absolute items-center end-0 top-0 mt-3 justify-center pr-5">
                                            {showPassword ? (
                                                <FaEye className="text-gray-400 w-5 h-5 cursor-pointer" onClick={handleTogglePassword} />
                                            ) : (
                                                <FaEyeSlash className="text-gray-400  w-5 h-5 cursor-pointer" onClick={handleTogglePassword} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {errors.password && <span className="text-sm text-red-500 italic">{errors.password.message}</span>}
                            </div>


                            <div className=" mb-4">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Confirm Password</label>

                                <div className="flex">

                                    <div className='relative w-full'>
                                        <input type={showConfirmPassword ? 'text' : 'password'} id="confirm_password" {...register('confirmPassword')} className="border text-sm rounded-lg block w-full p-2.5 bg-surface-200 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter confirm password" />

                                        {/* Show eye icon in the input field */}
                                        <div className="absolute items-center end-0 top-0 mt-3 justify-center pr-5">
                                            {showConfirmPassword ? (
                                                <FaEye className="text-gray-400 w-5 h-5 cursor-pointer" onClick={handleToggleConfirmPassword} />
                                            ) : (
                                                <FaEyeSlash className="text-gray-400  w-5 h-5 cursor-pointer" onClick={handleToggleConfirmPassword} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {errors.confirmPassword && <span className="text-sm text-red-500 italic">{errors.confirmPassword.message}</span>}
                            </div>

                            <div className="mb-4  text-center">
                                <button className="bg-primary-300 hover:bg-primary-200 w-full text-white font-medium tracking-wider py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
                            </div>
                            <div className="text-center">
                                <Link to="/login" className="inline-block align-baseline text-sm text-primary-600 hover:underline">Already have an account? Sign in</Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default SignUp