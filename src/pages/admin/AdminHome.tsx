import React, { useEffect, useState } from 'react'
import CardDataStats from '../../components/dashboard/userDashboard/CardDataStats'
import { IoIosFitness } from 'react-icons/io'
import useAxiosPrivate from '../../axios/useAxiosPrivate'
import { MdMenuBook } from 'react-icons/md'
import { FaUser } from "react-icons/fa";
import { RiArticleFill } from 'react-icons/ri'
import useLoading from '../../hooks/useLoading'
import { CardDataStatsSkeleton } from '../../components/dashboard/common/Skeleton'

interface CardData {
  blogs: number
  workouts: number
  recipes: number
  users: number
  userworkouts: number
}

type Props = {}

const AdminHome = (props: Props) => {

  const [cardData, setCardData] = useState<CardData>({
    blogs: 0,
    recipes: 0,
    users: 0,
    userworkouts: 0,
    workouts: 0
  });
  const { loading, stopLoading } = useLoading();
  const axiosPrivate = useAxiosPrivate();

  const getCardData = async () => {
    try {
      const response = await axiosPrivate.get('/admin/getallcarddata')

      setCardData(response.data.data)
      stopLoading()
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getCardData();

  }, []);




  return (
    <>
      <div className="grid grid-cols-1  gap-4  md:gap-6 sm:grid-cols-3 2xl:gap-7.5">

        {loading ?
          <>
            <CardDataStatsSkeleton />
            <CardDataStatsSkeleton />
            <CardDataStatsSkeleton />
          </> :
          <>

            <CardDataStats title="Total Users" total={cardData.users}  >
              <FaUser className='w-4 h-5 text-white' />
            </CardDataStats>
            <CardDataStats title="Total Workouts" total={cardData.workouts}  >
              <IoIosFitness className='w-7 h-8 text-white' />
            </CardDataStats>

            <CardDataStats title="Total Blogs" total={cardData.blogs}   >
              <RiArticleFill className='w-6 h-6 text-white' />
            </CardDataStats>

          </>
        }
      </div>

      <div className='flex flex-col sm:flex-row w-full justify-center mt-[1rem] gap-4' >

        <div className='sm:w-1/3 w-full '>
{loading ? <CardDataStatsSkeleton/> :

          <CardDataStats title="Total Recipe" total={cardData.recipes}   >
            <MdMenuBook className='w-6 h-6 text-white' />
          </CardDataStats>
}
        </div>
        <div className='sm:w-1/3 w-full'>
        {loading ? <CardDataStatsSkeleton/> :

<CardDataStats title="Total Workout Used" total={cardData.userworkouts}   >
<IoIosFitness className='w-7 h-8 text-white' />
</CardDataStats>
}
         
        </div>

      </div>

    </>
  )
}

export default AdminHome