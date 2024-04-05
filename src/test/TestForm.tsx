import React, { useEffect } from 'react';
import { useForm , useFieldArray} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';
import MyComponent from './MyComponent';

type Props = {};


interface Address {
    street: string;
    city: string;
  }

interface FormInput {
    firstname: string;
    lastname: string;
    email: string;
    contactno: string;
    gender: string;
    hobby: string[];
    country: string;
    state: string;
    password: string;
    confirmPass:string;
    addresses:Address[];
}

const validationSchema = yup.object().shape({
    firstname: yup.string().required('Firstname required'),
    lastname: yup.string().required('lastname required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    contactno: yup.string().required('Contact number is required').matches(/^\d{10}$/, 'Invalid phone number'),
    gender: yup.string().required('Gender is required'),
    hobby: yup.array().min(1, 'Select at least one hobby'),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    password: yup.string()
        .required('Password is required')
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Password must contain at least 8 characters, one uppercase letter, one number and one special character'
        ),
    confirmPass: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Confirm Password does not match'),
    addresses: yup.array().of(yup.object().shape({
        street: yup.string().required('Street is required'),
        city: yup.string().required('City is required')
    }))
});
const TestForm = (props: Props) => {
    const { register, handleSubmit, formState: { errors , isDirty , isValid , isSubmitSuccessful , isSubmitted , isSubmitting}, watch , control  , reset} = useForm({resolver:yupResolver(validationSchema)  , defaultValues: {
        addresses: [{ street: '', city: '' }]
      }  , mode:"onBlur"
    } );
    const { fields, remove, append } = useFieldArray({
        control,
        name: "addresses"
      });
    const onSubmit = (data:any) => {
        console.log(data);
    };

    useEffect(()=>{
if(isSubmitSuccessful){
    reset();
}
    } , [isSubmitSuccessful , reset])


    return (

        <div className="max-w-md mx-auto">
            <ErrorBoundary>
                <MyComponent/>
            </ErrorBoundary>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">FirstName:</label>
                    <input
                        type="text"
                        id="firstname"
                        placeholder="Enter first name"
                        {...register("firstname")}
                        
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <span className="text-red-500 text-xs italic">{errors.firstname && errors.firstname.message}</span>
                </div>
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">LastName:</label>
                    <input
                        type="text"
                        id="lastname"
                        placeholder="Enter last name"
                        {...register("lastname",)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <span className="text-red-500 text-xs italic">{errors.lastname && errors.lastname.message}</span>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email address"
                        {...register("email", {
                           
                           
                            validate:{
                                emailAvailable : async(fieldvalue)=>{
                              const res= await axios.get(`https://jsonplaceholder.typicode.com/users?email=${fieldvalue}`)
                           const data = await res.data
                           return data.length == 0 || "email exists"
                            }
                            
                            }
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <span className="text-red-500 text-xs italic">{errors.email && errors.email.message}</span>
                </div>
                <div className="mb-4">
                    <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">ContactNo:</label>
                    <input
                        type="number"
                        id="contact"
                        placeholder="Enter contact number"
                        {...register("contactno", )}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <span className="text-red-500 text-xs italic">{errors.contactno && errors.contactno.message}</span>
                </div>





                
          {fields.map((field, index) => (
            <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Addresses {index+1}</label>
            <div key={field.id} className="flex mb-2">
              <input
                type="text"
                {...register(`addresses.${index}.street` ,  ) }
                defaultValue={field.street}
                placeholder="Street"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="text-red-500 text-xs italic">{errors.addresses?.[index]?.street?.message}</span>
              <input
                type="text"
                {...register(`addresses.${index}.city`, )}
                defaultValue={field.street}
                placeholder="City"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
              />
              <span className="text-red-500 text-xs italic">{errors.addresses?.[index]?.city?.message}</span>
              {index !== 0 && <button type="button" className='mt-2 py-2 ml-2 px-2 bg-red-400 text-white font-bold rounded' onClick={() => remove(index)}>Remove </button>}
            </div>
            </div>

          ))}
          <button type="button" onClick={() => append({ street: "", city: "" })} className="mt-2 py-1 px-2 bg-green-500 text-white font-bold rounded">Add Address</button>
       







                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
                    <div>
                        <label htmlFor="male" className="mr-2">
                            <input
                                type="radio"
                                id="male"
                                value="Male"
                                {...register("gender", )}
                            />
                            Male
                        </label>
                        <label htmlFor="female">
                            <input
                                type="radio"
                                id="female"
                                value="Female"
                                {...register("gender")}
                            />
                            Female
                        </label>
                    </div>
                    <span className="text-red-500 text-xs italic">{errors.gender && errors.gender.message}</span>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Hobbies:</label>
                    <div>
                        <label htmlFor="reading" className="mr-2">
                            <input
                                type="checkbox"
                                id="reading"
                                value="Reading"
                                {...register("hobby", )}
                            /> Reading
                        </label>
                        <label htmlFor="dancing" className="mr-2">
                            <input
                                type="checkbox"
                                id="dancing"
                                value="Dancing"
                                {...register("hobby")}
                            />
                            Dancing
                        </label>
                        <label htmlFor="sports">
                            <input
                                type="checkbox"
                                id="sports"
                                value="Sports"
                                {...register("hobby")}
                            />
                            Sports
                        </label>
                    </div>
                    <span className="text-red-500 text-xs italic">{errors.hobby && errors.hobby.message}</span>
                </div>
                <div className="mb-4">
                    <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
                    <select
                        {...register("country", )}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select country</option>
                        <option value="USA">USA</option>
                        <option value="India">India</option>
                    </select>
                    <span className="text-red-500 text-xs italic">{errors.country && errors.country.message}</span>
                </div>
                <div className="mb-4">
                    <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State:</label>
                    <select
                        {...register("state", 
                        {disabled:watch("country") ==="",})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select state</option>
                        <option value="state1">State 1</option>
                        <option value="state2">State 2</option>
                    </select>
                    <span className="text-red-500 text-xs italic">{errors.state && errors.state.message}</span>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                        type="password"
                        {...register("password", 
                          )}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <span className="text-red-500 text-xs italic">{errors.password && errors.password.message}</span>
                </div>


                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                    <input
                        type="password"
                        {...register("confirmPass", 
                           
                      )}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <span className="text-red-500 text-xs italic">{errors.confirmPass && errors.confirmPass.message}</span>
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TestForm;