import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { UserWorkoutData } from '../../../pages/user/userDashboard/UserHome';


ChartJS.register(ArcElement, Tooltip, Legend);
type Props = {
  chartData: UserWorkoutData[]
}

const PieChart = ({ chartData }: Props) => {

  const completedColor = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235,  0.7)',
    'rgba(255, 206, 86,  0.7)',
    'rgba(75, 192, 192,  0.7)',
    'rgba(153, 102, 255,  0.7)',
    'rgba(255, 159, 64,  0.7)',
  ];
  const remainingColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];

  const borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ]


  const data = {
    labels: ["Completed", "Remaining"],
    datasets: chartData.map((entry, index) => ({
      label: entry.workoutId ? entry.workoutId.title : entry.title,
      data: [entry.completedDays, entry.targetDays - entry.completedDays],
      backgroundColor: [
        completedColor[index % completedColor.length],
        remainingColor[index % remainingColor.length],
      ],
      borderColor: [
        completedColor[index % completedColor.length],
      ],
      borderWidth: 1,
    })),


  };
  console.log(data);
  // },

  const options = {
    plugins: {

      legend: {
        labels: {
          usePointStyle: true,
          generateLabels: function (chart: any) {
            const datasets = chart.data.datasets;
            const labels: any[] = [];
            datasets.forEach(function (dataset: any, i: any) {
              const label = dataset.label;
              const color = completedColor[i % completedColor.length];
              labels.push({ text: label, fillStyle: color, pointStyle: 'rect', lineWidth: 0, fontColor: '#FFFFFF' });
            });
            return labels;
          },
        },

      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            const value = context.formattedValue + ' days';
            return `${label}: ${value}`;
          },
        },
      },
    },
  };



  return (
    <div className=" ">
      <div className="mb-4 justify-center items-center sm:flex">
        <div>
          <h5 className="md:text-2xl  text-xl font-semibold text-center  text-white">
            Daily Workout Analytics
          </h5>
        </div>

      </div>

    
    {  chartData.length > 0 ?

        (
        <div className="">
          <div id="chartThree" className=" h-[22rem] mt-2 flex justify-center">
            <Pie data={data} options={options} />  </div>
        </div>
        ) : (
          <div className='flex flex-col justify-center items-center mt-20 '>
            <span className='text-primary-600 mb-1.5 font-semibold text-xl text-center'>Oops! 🙈 No workout data available.!</span>
            <span className='text-white text-sm'>Add your workout and track your progress!</span>
          </div>
        )
  }
    </div>

  )
}

export default PieChart


