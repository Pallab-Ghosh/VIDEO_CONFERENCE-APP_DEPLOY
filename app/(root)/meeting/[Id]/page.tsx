'use client' 
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingSetup from '../_components/MeetingSetup'
import MeetingRoom from '../_components/MeetingRoom'
import { useGetCallById } from '@/hooks/useGetCallById'
import { Loading } from '@/components/Loading'
import { useNotificationSounds } from '@/hooks/useNotificationSounds'
 

type MeetingIdpageProps = {
    params:{
        Id:string
    }
}


const MeetingIdpage = ({params}:MeetingIdpageProps) => {

    const {user , isLoaded} = useUser();
    const [issetupComplete , setIsSetupComplete] = useState(false)
    const {isCallLoading ,call } = useGetCallById(params.Id)
    useNotificationSounds();

     
 

    if(!isLoaded || isCallLoading) return <Loading/>
  
  

  return (
    <main className='h-screen w-screen'>
         <StreamCall call={call} >
            <StreamTheme>
               {
                !issetupComplete ? <MeetingSetup setIsSetupComplete = {setIsSetupComplete}/> : <MeetingRoom/>
               }
            </StreamTheme>
         </StreamCall>
     </main>
  )
}

export default MeetingIdpage