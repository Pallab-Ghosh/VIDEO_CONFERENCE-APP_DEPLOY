'use client'
import { Button } from '@/components/ui/button';
import {  DeviceSettings, ToggleVideoPreviewButton, ToggleVideoPublishingButton, useCall, useCallStateHooks, VideoPreview } from '@stream-io/video-react-sdk'
import { Camera, CameraIcon, CameraOff, Copy, Mic2, MicOff, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import VideoOffPreview from './VideoPreview';
import { cn } from '@/lib/utils';
import { useMicrophoneMute } from '@/hooks/useMicrophone';
import { Loading } from '@/components/Loading';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';



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
    //console.log(userdata.user?.imageUrl)
     const pathname = usePathname();
     const id = pathname.split('meeting/')[1]
     const { toast } = useToast()
      
  

    if(!call) throw new Error('No call is found');

    const handleCreateMeeting = (Meeting_Url:string)=>{
      navigator.clipboard.writeText(Meeting_Url);
      toast({title : 'Link copied'})
  }

   
  return (
    <div className='h-screen flex w-screen flex-col items-center justify-center gap-3   text-white relative '>

             
 
                        <div className=' mt-0 relative bg-slate-100 md:flex flex-col mb-10 h-[210px] lg:w-[540px] lg:mt-7  rounded-xl hidden'>

                          <div className=' flex flex-col justify-center'>
                              <h1 className=' text-2xl m-4 text-black font-bold text-center'>Your meeting is ready</h1>
                              <p className=' text-center mt-0 text-lg lg:text-sm mx-5 text-black'> Share this meeting link with others you want in the meeting  </p> 
                          </div>
                      
                            <div className='flex gap-5 mt-5 items-center justify-center  bg-slate-300 mx-5 h-9 p-1'>
                                 <div className='flex items-center justify-center  text-black font-bold  '>{`meeting/${id}`}</div>
                                 <Copy height={24} color='black' width={24} className=' ml-9 cursor-pointer' onClick={()=>handleCreateMeeting(`${process.env.NEXT_PUBLIC_URL}/meeting/${id}`)}/>
                            </div>

                               <p className=' mt-7 text-black mx-5 font-bold'>Joined as {userdata.user?.primaryEmailAddress?.emailAddress}</p>
                        </div>

                          <VideoPreview DisabledVideoPreview={VideoOffPreview}/>
                          {
                            !isMute && (
                                <div className=' absolute md:mt-96 mt-24'>
                              
                                    <div className=' flex gap-5 '>
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
                
               
               <div className=' flex justify-center mt-12 gap-1'>
                
                  <Button className="rounded-lg bg-blue-600 px-4 py-2.5"  onClick={() => {  call.join(); setIsSetupComplete(true)}}>
                      Join meeting
                  </Button>

                  <DeviceSettings />
               </div>
 
               <div className='flex flex-1 sm:hidden gap-5 mt-[600px] bg-red-300  ml-auto  w-full p-3 md:hidden opacity-70 absolute rounded-lg'>
                <div className='flex items-center justify-center text-black font-bold truncate'>{`meeting/${id}`}</div>
                <Copy height={24} color='black' width={24} onClick={()=>handleCreateMeeting(`${process.env.NEXT_PUBLIC_URL}/meeting/${id}`)}/>
              </div> 
                                       
    </div>
  )
}

export default MeetingSetup