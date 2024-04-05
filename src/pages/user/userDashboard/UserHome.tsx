import React, { useEffect, useState } from 'react'
import CardDataStats from '../../../components/dashboard/userDashboard/CardDataStats'
import PieChart from '../../../components/dashboard/userDashboard/PieChart';
import SelectedWorkoutTable from '../../../components/dashboard/userDashboard/SelectedWorkoutTable';
import { IoIosFitness } from "react-icons/io";
import ProgressBar from '../../../components/dashboard/userDashboard/ProgressBar';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';
import StaticCard from '../../../components/dashboard/userDashboard/StaticCard';
import { GiSandsOfTime } from "react-icons/gi";
import { CardDataStatsSkeleton, ChartSkeleton } from '../../../components/dashboard/common/Skeleton';
import useLoading from '../../../hooks/useLoading';




export interface UserWorkoutData {
  _id: string
  title: string;
  targetDays: number;
  duration: number;
  completedDays: number
  workoutId: {
    _id: string;
    title: string;
  };
  startDate: Date;
  endDate: Date;
  workoutType: string
  completed: boolean
  completionStatus: {
    date: Date;
    checked: boolean;
  }[];
}

const UserHome = () => {

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [chartData, setChartData] = useState<UserWorkoutData[]>([])
  const [cardData, setCardData] = useState<UserWorkoutData[]>([])
  const axiosPrivate = useAxiosPrivate();
  const { loading, stopLoading } = useLoading();

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const getChartData = async (date: string) => {
    try {
      const response = await axiosPrivate.get(`/progress/getchartdata`, {
        params: {
          selectedDate: date,
        }
      });
      console.log(response)
      setChartData(response.data.data);
      stopLoading()
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const updateChartData = () => {
    getChartData(selectedDate);
  };

  useEffect(() => {
    getChartData(selectedDate);
  }, [selectedDate]);


  const getCardData = async () => {
    try {
      const response = await axiosPrivate.get(`/progress/getcarddata`);
      console.log(response)
      setCardData(response.data.data);
      stopLoading()
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  useEffect(() => {
    getCardData()
  }, [])

  const calculateTotalWorkoutTime = (workouts: UserWorkoutData[]) => {
    const totalMinutes = workouts.reduce((total, workout) => total + (workout.duration * workout.completedDays), 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  const totalWorkoutTime = calculateTotalWorkoutTime(cardData);
  return (
    <>

      <div className=" grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7  ">
        <div className='col-span-12 lg:col-span-6 '>

          <StaticCard />
        </div>

        <div className='col-span-12 lg:col-span-3'>
          {loading ? ( // Show skeleton while loading
            <CardDataStatsSkeleton />
          ) : (
            <CardDataStats title="Total Workout" total={cardData.length}>
              <IoIosFitness className='w-7 h-8 text-white' />
            </CardDataStats>
          )}
        </div>
        <div className='col-span-12 lg:col-span-3'>
          {loading ? ( // Show skeleton while loading
            <CardDataStatsSkeleton />
          ) : (
            <CardDataStats title="Total Workout Time" total={`${totalWorkoutTime.hours > 0 ? `${totalWorkoutTime.hours} h` : ''} ${totalWorkoutTime.minutes > 0 ? `${totalWorkoutTime.minutes} min` : 0}`}>
              <GiSandsOfTime className='w-7 h-7 text-white' />
            </CardDataStats>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7 ">

        <div className="col-span-12 lg:col-span-6  xs:h-[28rem] h-[23rem] sm:px-7.5  rounded-md border border-gray-800 bg-surface-200 px-5 pb-7 pt-5 shadow-slate-600 shadow-inner">
          {loading ? <ChartSkeleton /> : <PieChart chartData={chartData} />}

        </div>
        <div className="col-span-12 lg:col-span-6 overflow-y-auto md:h-[28rem] h-[25rem] sm:px-7.5  rounded-md border border-gray-800 bg-surface-200 px-5 pb-7 pt-5 shadow-slate-600 shadow-inner overflow-x-auto">
          {loading ? <ChartSkeleton /> : <ProgressBar chartData={chartData} getChartData={getChartData} selectedDate={selectedDate} />}
        </div>


      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 ">
          <SelectedWorkoutTable selectedDate={selectedDate} onDateChange={handleDateChange} updateChartData={updateChartData} updateCardData={getCardData} />
        </div>
      </div>



    </>
  )
}

export default UserHome


