import React from 'react'
import { Link } from 'react-router-dom';
import { WorkoutData } from './Workout';


type Props = {
  data:WorkoutData
};

const WorkoutCard = ({data }: Props) => {
    return (
        <div>
<Link to={`${data._id}`}>
            <div className=" rounded overflow-hidden shadow-inner shadow-slate-400 flex flex-col bg-surface-200">
                <div className='overflow-hidden h-48'>
                    <img
                        className="w-full h-full object-fill"
                        src={`http://localhost:5000/${data.thumbnail}`}
                        loading='lazy'
                    />
                </div>
                <div className="px-4 py-2 mb-auto">

                    <h3 className="mb-2 text-xl font-normal  text-white text-center overflow-hidden overflow-ellipsis whitespace-nowrap">{data.title}</h3>

                </div>


            </div>
            </Link >
        </div>



    )
}


export default WorkoutCard