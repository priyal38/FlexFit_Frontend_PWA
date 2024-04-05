import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { BlogData } from './Blog';




type Props = {
  data:BlogData
};

const BlogCard = ({ data} :Props) => {

  
  return (
  <>     
  <Link to={`${data._id}`}>
        <div className="h-full  bg-surface-200 rounded-lg overflow-hidden shadow-inner shadow-slate-400">
          <img className="lg:h-48 md:h-48 h-44 w-full object-cover object-center" src={`http://localhost:5000/${data.coverImg}`}   loading='lazy' alt="blog"/>
          <div className="px-6 py-4">
            <h2 className="tracking-wider text-xs title-font text-gray-400 mb-1 	text-transform: capitalize">{data.category}</h2>
            <h1 className="title-font text-lg font-medium text-white mb-2 truncate">{data.title}</h1>
            <p className="leading-relaxed text-sm text-gray-200 mb-3 truncate">{data.subtitle}.</p>
            <div className="flex items-center flex-wrap ">

              <Link to={`${data._id}`} className="text-indigo-400  text-xs inline-flex items-center justify-center md:mb-2 lg:mb-0" >Learn More
                <FaArrowRightLong className='w-3 h-3 ml-2 text-indigo-400'/>
              </Link>
            
            </div>
          </div>
        </div>
        </Link>
  </>
  )
}

export default BlogCard
