import React, { useEffect, useState } from 'react';
import SearchBar from '../common/SearchBar';
import WorkoutCard from './WorkoutCard';
import useAxiosPrivate from "../../../axios/useAxiosPrivate";
import{ CardSkeleton} from '../common/Skeleton';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../common/Pagination';
import { useSearchParams } from 'react-router-dom';
import Filters  from './Filters';
import useLoading from '../../../hooks/useLoading';

 export interface FilterOptions {
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedDifficulties: string[];
}


export interface WorkoutData {
  _id: string;
  title: string;
  thumbnail: string;
  category: string;
  subCategory: string;
  difficultyLevel: string;
  equipment: string;
  videoUrl: string;
  explanation: string;
}

const Workout = () => {
  const axiosPrivate = useAxiosPrivate();
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    selectedCategories: [],
    selectedSubcategories: [],
    selectedDifficulties: [],
  });
  const [searchParams] = useSearchParams();
  const { currentPage, totalPages, handlePageChange, updateTotalPages } = usePagination();
  const {loading  , stopLoading} = useLoading()
  const perPage = 6;

  const getWorkoutData = async () => {
    try {
      console.log(filterOptions.selectedCategories);
      console.log( filterOptions.selectedSubcategories);
      console.log(filterOptions.selectedSubcategories);

      
      const queryParamValue = searchParams.get('q');
      const response = await axiosPrivate.get(`/workout/getworkout`, {
        params: {
          page: currentPage,
          perPage:perPage,
          query: queryParamValue || '',
          category: filterOptions.selectedCategories, 
          subCategory: filterOptions.selectedSubcategories, 
          difficultyLevel: filterOptions.selectedDifficulties 
        }
      });

      setWorkouts(response.data.data.workouts);
      updateTotalPages(response.data.data.totalPages);
      stopLoading()
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setWorkouts([]);
      
    }
  };

  useEffect(() => {
    getWorkoutData();

  }, [currentPage, searchParams]);

  const handleFilterChange = () => {
    getWorkoutData();
    // Trigger fetching data when filters change
  };


  return (
    <>
    <div className='flex sm:flex-row flex-col gap-4'>

      <SearchBar />
      

      <Filters
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        onFilterChange={handleFilterChange}
   
      />
      
    </div>

      {loading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />

          </div>
        </>
      ) : workouts.length !== 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout._id}
                data={workout}
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
}

export default Workout;
