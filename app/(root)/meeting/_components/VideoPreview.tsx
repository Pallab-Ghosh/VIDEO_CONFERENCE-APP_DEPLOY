'use client'


import { useMicrophoneMute } from '@/hooks/useMicrophone'
import { cn } from '@/lib/utils'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { BlobOptions } from 'buffer'
import { Camera, CameraOff, Mic, Mic2, MicOff } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'



const VideoOffPreview = () => {

   const IsMicrophoneMute = useMicrophoneMute();
   const call = useCall();

 
  return (

    <div className=' pt-36 flex justify-center flex-col  h-96 rounded-xl w-full flex-1  bg-dark-1 border-2 border-zinc-200 items-center text-white'>
        
        <p className=' mb-32 text-white text-center text-lg font-bold'>No Preview Available</p>

        <div className=' flex gap-5 mb-8'>
          <div className='flex items-center justify-center flex-col  bg-red-600 w-16 rounded-full h-14 '>
                <CameraOff  height={30} width={30} onClick={()=>call?.camera.enable()} /> 
            </div>

            <div className={cn('flex items-center justify-center gap-6  w-16 rounded-full h-14',IsMicrophoneMute && 'bg-red-600' , !IsMicrophoneMute && 'bg-transparent'  )}>
                {
                    !IsMicrophoneMute ? <Mic2  height={30} width={30} onClick={()=>call?.microphone.disable()} /> : <MicOff  height={30} width={30} onClick={()=>call?.microphone.enable()} />  
                } 
            </div>
        </div>
          
    </div>
  )
}

export default VideoOffPreview