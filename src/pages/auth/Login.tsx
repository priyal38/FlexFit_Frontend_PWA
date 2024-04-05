import React, { useState, useEffect } from 'react'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import imagelogin from '../../images/about.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/LandingPage/Header';
import Footer from '../../components/LandingPage/Footer';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
interface LoginFormInputs {
  email: string;
  password: string;
}


const Login = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { auth, setAuth } = useAuth();

  // useEffect(() => {
  //   if (auth.user.email) {
  //     navigate('/')
  //   }
  // }, [])

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Toggle showPassword state
  };

  const onSubmit = async (data: LoginFormInputs) => {

    try {

      const response = await axios.post('http://localhost:5000/api/auth/login', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
console.log(response)
      const { token } = response.data;
      const {role , email , firstname , lastname , profilePhoto} = response.data.user;
      const username = firstname + " " + lastname;
      console.log(username)


      if (response.status === 200) {
        window.localStorage.setItem(
          'user',
          JSON.stringify({
            role, token , email , username  , profilePhoto
          }),
        );

        setAuth({
          user: {
            username,
            email,
            role,
            token,
            image:profilePhoto
          },
          
        })


    toast.success("Login successfull")

        if (response.data.user.role === 1) {
          navigate('/admin')
        }
        if (response.data.user.role === 0) {
          navigate('/user')
        }

      }

  
    }
    catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center mt-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={imagelogin} alt="" className="w-full h-full object-cover opacity-35 brightness-50" />
        </div>

        {/* Login Form */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="bg-surface-200 shadow-inner shadow-neutral-200 ml-2 mr-2 rounded-2xl px-8 pt-6 pb-8 mb-4">
            <div className="text-center">
              <div className="bg-primary-400  rounded-full inline-block p-2">
                <LockOutlinedIcon className="h-10 w-10 text-white" />
              </div>
              <h2 className="mt-1 text-xl font-medium text-white">Login</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>


                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm  border border-e-0  rounded-s-md bg-surface-200 text-gray-400 border-gray-600">
                    <MdEmail className='h-6 w-6' />
                  </span>
                  <input type="text"  {...register('email')} className="rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5  bg-surface-200  border-gray-600 placeholder-gray-200 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter email" />
        
                </div>
                  {errors.email && <p className="text-red-500 text-sm italic">{errors.email.message}</p>}
              </div>
     

<div className=" mb-4">
<label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>

      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm border border-e-0 rounded-l-md bg-surface-200 text-gray-400 border-gray-600">
          <RiLockPasswordFill className='h-6 w-6' />
        </span>
        <div className='relative w-full'>
        <input type={showPassword ? 'text' : 'password'}   {...register('password')} className="rounded-none rounded-e-lg border block  min-w-0 w-full text-sm p-2.5  bg-surface-200 border-gray-600 placeholder-gray-200 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Password" />
       
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
    {errors.password && <p className="text-red-500 text-sm italic">{errors.password.message}</p>} 
    </div>

              <div className="mb-4 text-center">
                <button className="bg-primary-400 hover:bg-primary-200  w-full text-white font-medium py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline text-lg tracking-wider" type="submit"> Login</button>
              </div>
              <div className='flex justify-between'>
                <div className="text-center">
                  <Link to="/forgot" className="inline-block align-baseline text-sm text-primary-600 hover:underline">Forgot password</Link>
                </div>
                <div className="text-center">
                  <Link to="/signup" className="inline-block align-baseline text-sm text-primary-600 hover:underline">Don't have an account? Sign Up</Link>
                </div>
              </div>
            </form>
          </div>
        
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login