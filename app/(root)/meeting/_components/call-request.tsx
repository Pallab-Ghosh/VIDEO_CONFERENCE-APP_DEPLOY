import { Button } from '@/components/ui/button'
import { Call } from '@stream-io/video-react-sdk'
import React from 'react'

type CallRequestprops ={
    call : Call
}



const CallRequest = ({call}:CallRequestprops) => {

    
    const handle_click = async()=>{
        await call.join();
    }

    const handle_click2 = async()=>{
        await call.leave({ reject: true });
    }
    
    
  return (
    <div className=' flex bg-slate-500'>
    <Button className=' bg-blue-600' onClick={handle_click}>accept</Button>
    <Button className=' bg-red-600' onClick={handle_click2}>Reject</Button>
  </div>
  )
}

export default CallRequest