import React, { useEffect } from 'react'
import { Line, Circle } from 'rc-progress';
import { UserWorkoutData } from '../../../pages/user/userDashboard/UserHome';

type Props = {
    chartData: UserWorkoutData[]
    getChartData: (date: string) => void;
    selectedDate: string;
}

const colors = [
    '#FF6384', // Red
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#8A2BE2', // Purple
    '#20B2AA', // Light Sea Green
    '#FF7F50', // Coral
    '#32CD32', // Lime Green
    '#FFD700'  // Gold
];

const ProgressBar = ({ chartData, getChartData, selectedDate }: Props) => {

    useEffect(() => {
        getChartData(selectedDate)
    }, [])


    return (
        <>


            <div className=" ">
                <div className=" justify-center items-center mb-4 sm:flex">
                    <div>
                        <h5 className="md:text-2xl text-xl font-semibold text-center  text-white">
                            Workout Analytics
                        </h5>
                    </div>

                </div>

                {chartData.length > 0 ? (
                    <div className="  flex flex-col gap-4 overflow-y-auto">
                        {chartData.map((entry, index) => (
                            <div key={index} className='flex flex-col gap-3  '>
                                <div className='flex relative'>
                                    <p className='text-white text-sm text-left capitalize'>{entry.workoutId ? entry.workoutId.title : entry.title}</p>

                                    <div className='absolute right-0 top-0'>
                                        <p className='text-white text-sm'> {((entry.completedDays / entry.targetDays) * 100).toFixed(2)}%</p>
                                    </div>
                                </div>

                                <div>
                                    <Line percent={((entry.completedDays) / entry.targetDays) * 100} strokeWidth={1} strokeColor={colors[index % colors.length]} className='w-full' />
                                </div>
                            </div>
                        ))}

                    </div>

                ) : (
                    <div className='flex flex-col justify-center items-center mt-20 '>
                        <span className='text-primary-600 mb-1.5 font-semibold text-xl text-center'>Oops! 🙈 No workout data available.!</span>
                        <span className='text-white text-sm'>Add your workout and track your progress!</span>
                    </div>
                )}

            </div>

        </>
    )
}

export default ProgressBar