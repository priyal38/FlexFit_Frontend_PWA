

import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import SearchBar from '../common/SearchBar';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';
import {CardSkeleton} from '../common/Skeleton';
import Pagination from '../common/Pagination';
import usePagination from '../../../hooks/usePagination';
import { useSearchParams } from 'react-router-dom';
import useLoading from '../../../hooks/useLoading';

export interface BlogData {
  _id: string;
  title: string;
  content: string[];
  author: string;
  category: string;
  coverImg: string;
  readtime: number;
  subtitle: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [searchParams] = useSearchParams();
  const { currentPage, totalPages, handlePageChange, updateTotalPages } = usePagination();
  const {loading , stopLoading} = useLoading();
  const axiosPrivate = useAxiosPrivate();
  const perPage = 3;


  const getBlogData = async () => {
    try {
      const queryParamValue = searchParams.get('q');
      const response = await axiosPrivate.get('/blog/getblog' , {
        params: {
          page: currentPage,
          perPage: perPage,
          query: queryParamValue || '',
        }
      });
   
      
      setBlogs(response.data.data.blogs);
      updateTotalPages(response.data.data.totalPages);
    stopLoading();
    } 
    catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([])
     
    }
  };
  
  useEffect(() => {
    getBlogData()
  }, [currentPage, searchParams]);

console.log(blogs);


  return (
    <>
        <SearchBar />
      {loading ? (
        <>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
       

          </div>
        </>
      ) : blogs.length !== 0 ? (
        <>
    
  

    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                data={blog}
              />
            ))}
          </div>
          <div className="mt-8">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
      ) : (
        <div className="mt-16 text-center flex flex-col  ">
          <span className='text-2xl'>😫😓😟</span>
        <span className=' text-lg text-white'>We've searched near and far.</span>
         <span className='text-gray-400'>We can't find any results that match your search.Try another spelling or different terms.</span></div>
      )}

    </>
  );
};

export default Blog;
