import React from 'react'
import cardimage from "../../../images/cardimage.png"
import cover from "../../../images/123.png"
import { useAuth } from '../../../context/AuthContext'

type Props = {}

const StaticCard = (props: Props) => {

    const {auth} = useAuth()
  return (
    <>




<div className="rounded-lg flex  border h-44 bg-gradient-to-b from-primary-200 to-primary-400   shadow-inner shadow-slate-600 border-gray-800">

<div className="w-7/12  py-3 pl-8  flex flex-col justify-center ">
        <p className="sm:text-xl text-lg text-white mb-2 font-semibold ">Hello, {auth.user.username}</p>
        <p className="text-sm     text-white mb-2 font-normal ">Have a nice day and don't forget to take care of your health!</p>   
    </div>
    <div className=" flex w-5/12 py-3 px-2  ">
        <img src={cardimage} className=" object-contain w-full h-full"/>
    </div>
   

</div>
    </>
  )
}

export default StaticCard