'use client'
import MeetingTypeList from '@/components/MeetingTypeList';
import Image from 'next/image'
import React from 'react'
import { useGetCall } from '@/hooks/useGetCall';
import { ImageSlider } from './_components/image-slider';

const Homepage = () => {

  const now =new Date();//get date and time
  const time = now.toLocaleTimeString('en-IN',{hour :'2-digit' , minute :'2-digit'});
  const date = (new Intl.DateTimeFormat('en-IN' ,{dateStyle : 'full'} )).format(now)
  const time_mode = time.slice(6,8);//get the time mode separately am/pm
  const new_time = time.slice(0,5) // get the time separately
  const {upcomingCalls} = useGetCall();
  
const upcoming_meeting_time = upcomingCalls[0]?.state.startsAt?.toLocaleString().split(',')[1]
 
 

  return (
    <section className='flex size-full flex-col gap-12 2xl:gap-24 text-white mt-10 sm:mt-0'>

      <div className='h-[300px] w-full rounded-[20px] bg-slate-800 bg-cover flex flex-col  relative' >
             <div className='absolute top-8 sm:left-8 z-10  text-white flex flex-col  ml-4 max-md:py-8 lg:px-11 max-sm:mr-8'>
                  
                  <div className=' flex items-center justify-center sm:w-[300px] h-12  w-72  bg-slate-700 rounded-lg'>
                     {
                       upcoming_meeting_time ?(
                       <div className=' text-slate-400 sm:h-6 text-center font-bold text-base'> 
                             Upcoming Meeting at <span className=' font-bold text-slate-50'>{upcoming_meeting_time}</span>
                        </div>
                       ):
                       (
                        <div className=' text-white-400 sm:h-6 text-center font-bold text-base'> 
                           Hey Folks !! What's next ?
                        </div>
                       )
                     }
                   
                  </div>

                   

                  <div className=' flex flex-col py-12 md:py-20  gap-3'>
                    <h1 className=' font-extrabold text-6xl lg:text-7xl'> <span className=' text-3xl'>{time}</span></h1>
                    <p className=' text-xl font-medium'>{date}</p>
                  </div>
                  
             </div> 

            <Image  src="/image/hero-background.png"  alt='bg'  height={300}  width={1400}  className=' max-md:hidden flex-1 rounded-[20px]' />
      </div>
       
        <MeetingTypeList/>
          <div className=' flex justify-center w-full bg-dark-2 '>
              <ImageSlider/>
          </div>
    </section>
  )
}

export default Homepage