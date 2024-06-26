
'use client'

import Image from "next/image"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { avatarImages } from "@/constants"
import { cn } from "@/lib/utils"
import { StreamVideoParticipant, useCallStateHooks } from "@stream-io/video-react-sdk"
import { useGetCallById } from "@/hooks/useGetCallById"

 
type MeetingCardProps = {
   
    icon               : string
    title              : string
    date               : string
    isPreviousMeeting  : boolean
    buttonIcon1?       : string
    handleClick ?      : ()=>void
    link               : string
    buttonText?        : string 
    callid ?            : string
     
}


 const MeetingCard = ({ icon , title , date , isPreviousMeeting , buttonIcon1 , buttonText , handleClick , link ,callid }:MeetingCardProps) => {
  
    const { toast } = useToast();
  
 
    const handleCreateMeeting = ()=>{
      navigator.clipboard.writeText(link);
      toast({title : 'Link copied'})
  }

 
    return (
      <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
          
          <article className="flex flex-col gap-5">
                <Image src={icon} alt="upcoming" width={28} height={28} />
                <div className="flex justify-between">
                      <div className="flex flex-col gap-2">
                          <h1 className="text-2xl font-bold">{title}</h1>
                          <p className="text-base font-normal">{date}</p>
                      </div>
                </div>
          </article>

        <article className={cn("flex justify-center relative", {})}>
              <div className="relative flex w-full max-sm:hidden">
                    {
                      avatarImages.map((img, index) => (
                        <Image  key={index}  src={img}  alt="attendee"  width={40}  height={40} className={cn("rounded-full", { absolute: index > 0 })}
                          style={{ top: 0, left: index * 28 }}
                        />
                      )) 

                    }
                       
              </div>
              
                {
                  !isPreviousMeeting && 
                  (

                  <div className="flex gap-2">

                        <Button onClick={handleClick} className="rounded bg-blue-700 font-bold px-6">
                            { buttonIcon1 &&  <Image src={buttonIcon1} alt="feature" width={20} height={20} />}
                              &nbsp; {buttonText}
                        </Button>

                        <Button  onClick={handleCreateMeeting} className=" bg-slate-700 px-6" >
                            <Image  src="/icons/copy.svg"  alt="feature"  width={20}  height={20}/>
                            &nbsp; Copy Link
                        </Button>
                  </div>
                  )
                }
        </article>

      </section>
   )
 }
 
 export default MeetingCard