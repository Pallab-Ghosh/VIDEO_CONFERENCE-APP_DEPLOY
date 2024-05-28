'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'

type TableProps = {
    title : string,
    description : string
}

const Table = ({title , description}:TableProps) =>{

  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">  {title} </h1>

      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl"> {description} </h1>
    </div>
  );

}
const PersonalRoompage = () => {

  const {user} = useUser();
  const title = user?.username;

  const MeetingId = user?.id ; 

  const Link = `${process.env.NEXT_PUBLIC_URL}/meeting/${MeetingId}?personal=true`

  const client = useStreamVideoClient();
  const { toast } = useToast();
  const router = useRouter();

    const {call , isCallLoading} = useGetCallById(MeetingId!);

    const CreateCall = async()=>{
        
      if(!client)return;

      const NewCall = client.call("default",  MeetingId!);

      if(!call)
        {
          await  NewCall.getOrCreate({ data: { starts_at: new Date().toISOString(), },})
        }

        router.push(`${process.env.NEXT_PUBLIC_URL}/meeting/${MeetingId}?personal=true`)
        
    }

    const handleCreateMeeting = ()=>{
      navigator.clipboard.writeText(Link);
      toast({title : 'Link copied'})
  }




  return (
    <section className=' flex size-full flex-col gap-10 text-white'>
        <h1 className= 'text-2xl font-semibold'> Personal Room </h1>
        
        <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
             <Table title="Topic" description = {`${title}'s Meeting Room`} />
             <Table title="Meeting id" description={`${MeetingId}`} />
             <Table title="Invite Link" description={Link!} />
        </div>

        <div className='flex gap-6'>
            <Button onClick={CreateCall} className=' bg-blue-700'>
                 Start the Meeting
            </Button>

            <Button onClick={handleCreateMeeting} className=' bg-slate-800'>
                 Copy Invitation
            </Button>

        </div>
  </section>
  )
}

export default PersonalRoompage