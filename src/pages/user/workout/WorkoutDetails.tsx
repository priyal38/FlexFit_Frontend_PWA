import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';
import ReactPlayer from 'react-player';
import FormModal from '../../../components/dashboard/workout/FormModal';
import { FaPlus } from 'react-icons/fa';
import { WorkoutData } from '../../../components/dashboard/workout/Workout';
import video from '../../../videos/How To Do The Barbell Curl Properly.mp4'
type Props = {};



const WorkoutDetails = (props: Props) => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  }
  const fetchWorkoutDetails = async () => {
    try {
      const response = await axiosPrivate.get(`/workout/getworkout/${id}`);
      setWorkoutDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching workout details:', error);
    }
  };

  useEffect(() => {
    fetchWorkoutDetails();
  }, [id]);

  return (
    <div>
      {modalOpen && (
        <>
          <div className="fixed inset-0 backdrop-filter backdrop-blur-lg" onClick={handleCloseModal}></div>
          <FormModal handleCloseModal={handleCloseModal} />
        </>
      )}

      {workoutDetails && (
        <section className="w-full  overflow-hidden">
          <div className="py-6 flex lg:flex-row flex-col justify-center lg:gap-3 ">
            <div className="lg:w-1/2 mb-4 lg:mb-0 ">
              {/* <ReactPlayer
                url={workoutDetails.videoUrl}
                controls
                light={<img src={`http://localhost:5000/${workoutDetails.thumbnail}`} alt="Thumbnail" className="w-full h-full"  loading='lazy'/>}
                muted={true}

                style={{ maxWidth: '100%', height: 'auto', margin: 'auto' }}
              /> */}
              <ReactPlayer
                url={video}
                controls
                light={<img src={`http://localhost:5000/${workoutDetails.thumbnail}`} alt="Thumbnail" className="w-full h-full"  loading='lazy'/>}
                muted={true}

                style={{ maxWidth: '100%', height: 'auto', margin: 'auto' }}
              />
            </div>
            <div className="lg:w-1/2  mx-5">
              <h1 className="text-white text-3xl title-font text-center font-medium mb-4">{workoutDetails.title}</h1>

              <div className="flex mb-4  text-gray-200">
                <button className={`flex-grow ${activeTab === 'overview' ? 'border-b-2 border-indigo-500' : 'border-b-2 border-gray-300'} py-2 text-lg px-1 focus:outline-none`} onClick={() => handleTabChange('overview')}>Overview</button>
                <button className={`flex-grow ${activeTab === 'details' ? 'border-b-2 border-indigo-500' : 'border-b-2 border-gray-300'} py-2 text-lg px-1 focus:outline-none`} onClick={() => handleTabChange('details')}>Details</button>

              </div>

              {activeTab === 'details' ? (
                <div className='flex items-center'>

                  <p className="text-white text-sm tracking-wide text-justify mb-8">{workoutDetails?.explanation}.</p>
                </div>
              ) :
                <>

                  <div className='text-white text-sm  mt-4  mb-4 shadow-md'>
                    <table className=' mx-w-lg mx-auto'>
                      <tr className='border-b bg-surface-200 border-gray-700 hover:bg-gray-600'>
                        <td className='px-6 py-3'>Category:</td>
                        <td className='px-4 capitalize py-3'>{workoutDetails.category}</td>
                      </tr>
                      <tr className='border-b bg-surface-200 border-gray-700 hover:bg-gray-600'>
                        <td className='px-6 py-3'>SubCategory:</td>
                        <td className='px-4 capitalize py-3'>{workoutDetails.subCategory}</td>
                      </tr>
                      <tr className='border-b bg-surface-200 border-gray-700 hover:bg-gray-600'>
                        <td className='px-6 py-3'>DifficultyLevel:</td>
                        <td className='px-4  capitalize py-3'>{workoutDetails.difficultyLevel}</td>
                      </tr>
                      <tr className='border-b bg-surface-200 border-gray-700 hover:bg-gray-600'>
                        <td className='px-6 py-3'>Equipment:</td>
                        <td className='px-4  capitalize py-3'>{workoutDetails.equipment}</td>
                      </tr>
                    </table>

                  </div>
                </>

              }



              <div className='flex justify-center mt-auto'>

                <button className="inline-flex w-80 items-center justify-center borderfocus:outline-none focus:ring-1 font-medium rounded-md text-md px-4 py-2 bg-primary-300 text-white border-gray-600 hover:bg-primary-400 hover:border-gray-600 focus:ring-gray-700" type="button" onClick={handleOpenModal}>
                  <FaPlus className='w-4 h-4 text-white me-2' />
                  Add Workout
                </button>
              </div>

            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WorkoutDetails;
