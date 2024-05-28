'use client'
import { Button } from '@/components/ui/button';
import {  DeviceSettings, ToggleVideoPreviewButton, ToggleVideoPublishingButton, useCall, useCallStateHooks, VideoPreview } from '@stream-io/video-react-sdk'
import { Camera, CameraIcon, CameraOff, Mic2, MicOff, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import VideoOffPreview from './VideoPreview';
import { cn } from '@/lib/utils';
import { useMicrophoneMute } from '@/hooks/useMicrophone';
import { Loading } from '@/components/Loading';
import { useUser } from '@clerk/nextjs';



type MeetingSetupProps ={
    setIsSetupComplete : (value:boolean)=>void
}

const MeetingSetup = ({setIsSetupComplete}:MeetingSetupProps) => {

    
     const [isMicCamOn , setisMicCamOn] = useState(false)
     const call = useCall();
    
     const { useCameraState } = useCallStateHooks();
     const { isMute } = useCameraState();

     const IsMicrophoneMute = useMicrophoneMute()
     const userdata = useUser()
    console.log(userdata.user?.imageUrl)
 

    if(!call) throw new Error('No call is found');
   
  return (
    <div className='h-screen flex  max-w-screen flex-col items-center justify-center gap-3  text-white relative'>
                
                { !isMute && <h2 className=' text-white sm:text-2xl font-bold mb-6'>Meeting Preview</h2>}
                
                  <VideoPreview DisabledVideoPreview={VideoOffPreview} />
                  {
                    !isMute && (
                        <div className=' absolute mt-52'>
                      
                            <div className=' flex gap-5 mb-8'>
                              {
                              isMute ? (
                                    <div className='flex items-center justify-center flex-col  bg-red-600 w-16 rounded-full h-14 '>
                                      <CameraOff  height={30} width={30} onClick={()=>call?.camera.enable()} /> 
                                    </div>
                                ):
                                (
                                  <div className='flex items-center justify-center flex-col  bg-red-600 w-16 rounded-full h-14 '>
                                    <CameraIcon  height={30} width={30} onClick={()=>call?.camera.disable()} /> 
                                  </div>
                                )
                               }

                                <div className={cn('flex items-center justify-center gap-6  w-16 rounded-full h-14',IsMicrophoneMute && 'bg-red-600' , !IsMicrophoneMute && 'bg-transparent'  )}>
                                    {
                                        !IsMicrophoneMute ? <Mic2  height={30} width={30} onClick={()=>call?.microphone.disable()} /> : <MicOff  height={30} width={30} onClick={()=>call?.microphone.enable()} />  
                                    } 
                                </div>
                            </div>
                      </div>
                    )
                    
                  }
               
               <div className=' flex justify-center mt-20 gap-1'>
                 
                  <Button className="rounded-lg bg-blue-600 px-4 py-2.5"  onClick={() => {  call.join(); setIsSetupComplete(true)}}>
                      Join meeting
                  </Button>

                  <DeviceSettings />
               </div>
                                 
    </div>
  )
}

export default MeetingSetup