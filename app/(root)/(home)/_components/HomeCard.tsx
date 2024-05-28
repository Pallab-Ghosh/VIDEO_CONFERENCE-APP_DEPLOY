import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'


type HomeCardProps = {
    bgcolor : string,
    Imagesrc : string,
    h2text   : string,
    ptext    : string,
    handleClick : ()=>void
}
const HomeCard = ({bgcolor , Imagesrc , h2text , ptext , handleClick}:HomeCardProps) => {

  return (
     
         <div className={cn('px-4 py-6 rounded-xl w-full xl:max-w-[370px] min-h-[260px] md:h-[150px] cursor-pointer flex flex-col',bgcolor)} 
          onClick={handleClick}
          >
             <div className='flex bg-slate-500 w-10 h-10 justify-center rounded-lg'>
                   <Image src={Imagesrc} height={27} width={27} alt='icon' className=' rounded-lg'/>
             </div>

             <div className='flex flex-col mt-28'>
                <h2 className='font-bold text-lg'>{h2text}</h2>
                <p className=' mt-2 text-slate-100'>{ptext}</p>
             </div>
         </div>
     
  )
}

export default HomeCard