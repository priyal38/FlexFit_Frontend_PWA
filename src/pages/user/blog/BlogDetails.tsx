import React, { useEffect, useState } from 'react'
import { BlogData } from '../../../components/dashboard/blog/Blog'
import useAxiosPrivate from '../../../axios/useAxiosPrivate';
import { useParams } from 'react-router-dom';
import { IoMdTime } from "react-icons/io";

type Props = {}

const BlogDetails = (props: Props) => {

    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [blogDetails, setBlogDetails] = useState<BlogData | null>(null);

    const fetchBlogDetails = async () => {
        try {
            const response = await axiosPrivate.get(`/blog/getblog/${id}`);
            console.log(response);

            setBlogDetails(response.data.data);
        } catch (error) {
            console.error('Error fetching workout details:', error);
        }
    };

    useEffect(() => {
        fetchBlogDetails();
    }, [id]);


    return (
        <>

            <div className="mb-4 md:mb-0 w-full mx-auto lg:w-[90%] ">
                <div className="px-4 lg:px-0 ">
                    <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-white leading-tight">
                        {blogDetails?.title}
                    </h2>
                    <p

                        className="py-2 text-primary-600 inline-flex  capitalize items-center justify-center mb-2"
                    >

                        {blogDetails?.subtitle}
                        <span className="text-gray-300 ml-3 inline-flex items-center justify-center  leading-none text-sm pr-3 py-1 border-l-2 border-gray-700">
                            <IoMdTime className='w-4 h-4 ml-2 mr-2' /> {blogDetails?.readtime} min
                        </span>
                    </p>
                </div>

                <div className='sm:h-[24rem] h-64 w-full mt-2'>
                    <img src={`http://localhost:5000/${blogDetails?.coverImg}`} className="w-full  h-full object-fit rounded-md "  loading='lazy' />
                </div>
            <div className="flex py-2 mt-4 px-4 lg:px-0 ">
                <img src="https://randomuser.me/api/portraits/women/97.jpg"
                    className="h-10 w-10 rounded-full mr-3 object-cover" />
                <div>
                    <p className="font-semibold text-gray-300 tracking-wide text-md"> {blogDetails?.author} </p>
                    <p className=" text-gray-300 text-xs"> Author</p>
                </div>
            </div>
            </div>
            < div className="flex flex-col justify-center lg:flex-row lg:space-x-12">

                <div className="px-4 lg:px-0 md:mt-4 mt-2 text-gray-200  tracking-wide text-md leading-relaxed w-full lg:w-[90%]  ">

                    {blogDetails?.content.map((item:any, index:any) => (
                        <p key={index} className="pb-6">
                            {item}
                        </p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BlogDetails