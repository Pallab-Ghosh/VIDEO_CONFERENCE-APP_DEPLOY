
// @ts-nocheck
'use client'

import { useGetCall } from '@/hooks/useGetCall'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './meeting-card'
import { Loading } from './Loading'

 

type CallListProps ={
    calltype : 'ended' | 'upcoming' | 'recordings'
}

const CallList = ({calltype}:CallListProps) => {
   
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const {endedCalls , upcomingCalls , recordingdata , loading} = useGetCall();
    

   


    const handle_call_type = ()=>{
       switch(calltype)
       {
           case 'ended':
             return endedCalls ;

           case 'upcoming':
             return upcomingCalls ;

           case 'recordings':
              return recordings;

            default :
              return [];
       }
    }

      const handle_No_call_message = ()=>{
        switch(calltype)
        {
            case 'ended':
              return 'No Previous Calls' ;
 
            case 'upcoming':
              return 'No Upcoming Calls' ;
 
            case 'recordings':
               return 'No Recordings';
 
             default :
               return '';
        }
      }

      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
       

      useEffect(()=>{

          const GetRecordingsData = async()=>{
                const data =  recordingdata.map((call)=>call?.queryRecordings() ?? [])
                const ResolvedRecordings = await Promise.all(data)
                const RecordingsData = ResolvedRecordings.filter((call)=>call.recordings.length > 0)
                const AllRecordings = RecordingsData.flatMap((call)=>call.recordings)
                setRecordings(AllRecordings)
          }
 
         if(calltype === 'recordings')  
           GetRecordingsData()
           

      },[calltype , recordingdata])


     const calls = handle_call_type();
     const msgs = handle_No_call_message();

     


     if(loading)return <Loading/>

  return (
     <div className=' grid grid-cols-1 xl:grid-cols-2 gap-5'>
         {
             calls && calls.length > 0 ? calls.map((meeting : Call | CallRecording)=>(

                 <MeetingCard

                    key={(meeting as Call).id}

                    icon = { calltype === 'ended' ? '/icons/previous.svg' :
                       calltype === 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg' }

                    title = {(meeting as Call)?.state?.custom.description.substring(0,26) ||    (meeting as CallRecording).filename?.substring(0, 20) ||
                       'No Description' }

                    callid ={(meeting as Call)?.id}

                      date  = {meeting.state?.startsAt?.toLocaleString() || meeting.start_time.toLocaleString()}

                    isPreviousMeeting = { calltype === 'ended'}

                    buttonIcon1 = {calltype === 'recordings' ? '/icons/play.svg' : undefined }

                    handleClick = {calltype === 'recordings'  ? () => router.push(`${(meeting as CallRecording).url}`) :
                     () => router.push(`/meeting/${(meeting as Call).id}`)
                     }
                     
                    link = {calltype === 'recordings' ? (meeting as CallRecording).url : `${process.env.NEXT_PUBLIC_URL}/meeting/${meeting.id}`   }
                    
                    buttonText = {calltype === 'recordings' ? 'Play' : '  Start Meeting'}

                 />
             )
            ) :
              
              (<h1 className=' text-white font-bold'>{msgs}</h1>)
         }
          
      </div>
  )
}

export default CallList