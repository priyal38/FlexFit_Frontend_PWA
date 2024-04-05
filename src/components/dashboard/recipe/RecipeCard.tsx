import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { RecipeData } from './Recipe';





type Props = {
   data:RecipeData

};

const RecipeCard = ({ data} :Props) => {
  return (
  <>     
  <Link to={`${data._id}`}>
        <div className="h-full  bg-surface-200 rounded-lg overflow-hidden shadow-inner shadow-slate-400">
          <img className="lg:h-48 md:h-48 h-44 w-full object-cover object-center" src={`http://localhost:5000/${data.image}`}  loading='lazy'/>
          <div className="px-6 py-4">
            <h2 className="tracking-wider text-xs title-font text-gray-400 mb-1 	text-transform: capitalize">{data.dietaryType}</h2>
            <h1 className="title-font text-lg font-medium text-white mb-2 truncate">{data.title}</h1>
            <p className="leading-relaxed text-sm text-gray-200 mb-3 truncate">{data.description}.</p>
            <div className="flex items-center flex-wrap ">

              <Link to={`${data._id}`}  className='w-full'>
                <button className=' w-full  borderfocus:outline-none focus:ring-1 font-medium rounded-md text-sm px-4 py-2 bg-primary-300 text-white  hover:bg-primary-400 '>View Recipe</button> 
            
              </Link>
             
            </div>
          </div>
        </div>
        </Link>
  </>
  )
}

export default RecipeCard
