'use client'
import HomeCard from '@/app/(root)/(home)/_components/HomeCard'
import { MeetingModal } from '@/components/MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useCallStateHooks, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { PlusSquare } from 'lucide-react'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'

import ReactDatePicker from 'react-datepicker';
import { Textarea } from './ui/textarea'
import MeetingSchedule from './MeetingSchedule'
import { Input } from './ui/input'
import { link } from 'fs'




export type Meeting_type =  'IsJoinMeeting' | 'IsInstantMeeting' | 'IsScheduleMeeting' | undefined;

const MeetingTypeList = () => {

    const { toast } = useToast()

    const [MeetingState ,SetMeetingState]= useState<Meeting_type>();
    const router = useRouter(); // router
    const user = useUser();//client user
    const client = useStreamVideoClient()//stream client
    const [MeetingCreating , setMeetingCreating] = useState(false) // for button disabled 
    const [calldetails , setcalldetails] = useState<Call>(); // call details
    
   

    const[values , setvalues] = useState({  dateTime : new Date(),  description: '',  link : ''})

   
    
    const Meeting_Url=`${process.env.NEXT_PUBLIC_URL}/meeting/${calldetails?.id}`

    const handleClick = async()=>{

      
      if(!client || !user)  return;

      const new_date_time = `${values.dateTime.getDay()}/${values.dateTime.getMonth()}/${values.dateTime.getFullYear()}  ${values.dateTime.getHours()}:${values.dateTime.getMinutes()}:${values.dateTime.getSeconds()}`

      try
       {
        
        setMeetingCreating(true)
          if(!values.dateTime)
            {
              toast({title : 'Please select a date and time'}); return;
            }
          
            
          const id = crypto.randomUUID();
          const call = client.call('default', id);
          if(!call) throw new Error('Call not successfully created');
          
          const startsAt    = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
          const description = values.description || 'Instant Meeting'

          await call.getOrCreate({data: {  starts_at : startsAt, custom:{ description : description }} , notify:true});
          setcalldetails(call);
        

          if(!values.description)
            {
              router.push(`${process.env.NEXT_PUBLIC_URL}/meeting/${call.id}`);
              toast({title: " Creating a Meeting Call",description: new_date_time, action: (<ToastAction altText="Goto schedule to undo" onClick={()=>router.push('/')}>Go Back</ToastAction>),})
            }
            else{
              toast(
              {title: " Call scheduled",
              description: `Meeting Schedule at  ${values.dateTime}`, action: (<ToastAction altText="Goto schedule to undo" onClick={()=>router.push('/')}>Go Back</ToastAction>),})
            }
       } 

      catch (error) {
         console.log(error);
         toast({title:'Failed to create a Meeting'})
      }
      
      finally{
         setMeetingCreating(false)
          
        }
  }

     

      const handleCreateMeeting = ()=>{
        navigator.clipboard.writeText(Meeting_Url);
        toast({title : 'Link copied'})
    }


  return (

    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
  
            <HomeCard
                bgcolor="bg-orange-400" Imagesrc ="/icons/add-meeting.svg"
                h2text="New Meeting" ptext="Start a Instant Meeting"
                handleClick = {()=>SetMeetingState('IsInstantMeeting')}
              />

              <HomeCard 
              bgcolor="bg-violet-600" Imagesrc ="/icons/scheduling.svg"
              h2text="Schedule Meeting" ptext="Plan your Meeting"
              handleClick = {()=>SetMeetingState('IsScheduleMeeting')}
              />
        
        
              <HomeCard 
                bgcolor="bg-blue-500" Imagesrc ="/icons/join-meeting.svg"
                h2text="Join Meeting" ptext="Via Invitation Link"
                handleClick = {()=>SetMeetingState('IsJoinMeeting')}
                />
        
           
              <HomeCard
                bgcolor="bg-amber-400" Imagesrc ="/icons/recordings.svg"
                h2text="View Recordings" ptext="Meeting Recordings"
                handleClick = {()=>router.push('/recordings')}
                />

                    <MeetingModal
                    IsOpen = {MeetingState === 'IsInstantMeeting'}
                    OnClose = {()=>SetMeetingState(undefined)}
                    title = "Start an Instant Meeting"
                    buttonText = "Start Meeting"
                    handleClick={handleClick}
                    MeetingCreating ={MeetingCreating}
                    />
             
                 {
                    !calldetails ? 
                      (
                          <MeetingModal 
                          IsOpen = {MeetingState === 'IsScheduleMeeting'}  
                          OnClose={() => SetMeetingState(undefined)}
                          title="Create Meeting" 
                          handleClick={handleClick}
                          >
                            <MeetingSchedule values={values} setvalues={setvalues} />
                        </MeetingModal>
                      
                      )
                        :
                         
                        (
                        <MeetingModal
                          IsOpen = {MeetingState === 'IsScheduleMeeting'}
                          OnClose = {()=>SetMeetingState(undefined)}
                          title = "Meeting Created"
                          buttonText = "Copy Meeting Link"
                          handleClick={handleCreateMeeting}
                          image="/icons/checked.svg"
                          buttonIcon="/icons/copy.svg"
                          MeetingState={MeetingState}
                          calldetails={calldetails}
                          refreshClickHandler={()=>{window.location.reload()}}
                          >
                          
                            </MeetingModal>
                        
                        )
               }


                   <MeetingModal
                    IsOpen = {MeetingState === 'IsJoinMeeting'}
                    OnClose = {()=>SetMeetingState(undefined)}
                    title = "Join a Meeting"
                    buttonText = "Join Meeting"
                    MeetingCreating ={MeetingCreating}
                    handleClick={()=>router.push(values.link)}
                    >
                       <Input type='url' value={values.link} onChange={(e)=>setvalues({...values , link:e.target.value})} className='border-none bg-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg' placeholder='Please provide meeting url' />
                    </MeetingModal>

    </section> 
  )
}

export default MeetingTypeList