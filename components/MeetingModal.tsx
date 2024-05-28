import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Meeting_type } from "./MeetingTypeList"
import { Call } from "@stream-io/video-react-sdk"
import { RefreshCcw } from "lucide-react"
 
 
type MeetingModalProps = {
    IsOpen           : boolean,
    OnClose          : ()=>void,
    title            : string,
    buttonText?      : string
    handleClick?     : ()=>void,
    children?        : React.ReactNode , 
    image?           : string
    buttonIcon?      : string
    className?       : string
    MeetingCreating? : boolean
    MeetingState ?   : Meeting_type
    calldetails?     : Call    
    refreshClickHandler?: ()=>void
}


export function MeetingModal({IsOpen , OnClose , title , buttonText ,MeetingCreating,calldetails,MeetingState, handleClick , image , children , buttonIcon , className , refreshClickHandler}:MeetingModalProps) {

  return (
    <Dialog open={IsOpen} onOpenChange={OnClose}>
          <DialogContent className="max-w-[550px] w-full flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
              <div className=" flex flex-col gap-6">
                    {
                      image && (
                        <div className=" flex justify-center">
                            <Image src={image} alt="image" width={72} height={72}  />
                        </div>
                      )
                    }
                      <p className={cn(" text-center font-bold text-lg leading-[42px]",className)}>{title}</p>
                        {children}

                      <Button  disabled={MeetingCreating} className=" w-full bg-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"  onClick={handleClick}>
                        { buttonIcon && <Image src={buttonIcon}  alt="button icon"  width={16}  height={16} className=" mr-2" />  }
                       
                        {"  "}
                        {buttonText  || 'Schedule Meeting'}
                      </Button>

                      {
                         calldetails && (
                          <Button  disabled={MeetingCreating} className=" w-full bg-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0" 
                            onClick={refreshClickHandler}
                            >
                            <RefreshCcw height={20} width={20} className=" mr-1" />
                             {"   "}
                             Refresh
                        </Button>
                        )
                      }
              </div>
          </DialogContent>
    </Dialog>
  )
}
