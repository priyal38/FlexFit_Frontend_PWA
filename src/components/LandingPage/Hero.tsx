import React from 'react';
import { Carousel } from 'flowbite-react';
import { SliderData } from '../../utils/SliderData'; 
type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="md:h-[90vh]  sm:h-[70vh] xs:h-[70vh] overflow-hidden mt-16 ">
      <div className="md:h-[90vh] sm:h-[70vh] xs:h-[70vh] w-full">
        <Carousel>
          {SliderData.map((item) => (
            <div key={item.id} className="relative md:h-[90vh] sm:h-[70vh] xs:h-[70vh]">
              <img src={item.bgImg} className='object-cover w-full h-full opacity-25 brightness-75' alt="..." />
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <h1 className="text-white  md:text-6xl sm:text-5xl text-2xl pb-3 font-bold text-center">{item.slogan}</h1>
                <h1 className="text-white md:text-6xl sm:text-5xl text-2xl  pb-4 font-bold text-center">{item.title}</h1>
                <p className="text-white  sm:text-lg text-base text-center">{item.desc}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
