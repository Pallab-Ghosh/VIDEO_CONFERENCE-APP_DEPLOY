import { useCallStateHooks } from "@stream-io/video-react-sdk";



export const useMicrophoneMute =()=>{
    const { useCameraState ,useMicrophoneState} = useCallStateHooks();
    const { microphone, isMute } = useMicrophoneState();

    const IsMicrophoneMute = isMute;
    return IsMicrophoneMute;
}