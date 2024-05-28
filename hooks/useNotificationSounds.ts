'use client'
import { CallingState, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useGetCallById } from "./useGetCallById";
import { playSoundFromUrl } from "@/action/playsound";


 



export function useNotificationSounds() {

  const params = useParams();
  const {isCallLoading ,call } = useGetCallById(params?.Id);
  const isSelf = useCallback(  (userId: string) => userId !== call?.currentUserId,  [call],);
  


  useEffect(() => {
   

    
    if (!call) {
      
      return;
    }

  
    const unlistenJoin = call?.on('call.session_participant_joined', (event) => {

      if (!isSelf(event.participant.user.id)) {
        playSoundFromUrl('/audio/mixkit-confirmation-tone-2867.mp3');
      }
    });

    const unlistenLeft = call?.on('call.session_participant_left', (event) => {
  
      if (!isSelf(event.participant.user.id)) {
        playSoundFromUrl('/audio/mixkit-atm-cash-machine-key-press-2841.mp3');
      }
    });

     
  
    return () => {
      unlistenJoin();
      unlistenLeft();
    };

  },[call , isSelf]);
}
  