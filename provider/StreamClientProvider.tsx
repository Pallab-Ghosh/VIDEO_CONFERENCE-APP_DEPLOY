'use client'

import { tokenProvider } from '@/action/stream.action';

import { useUser } from '@clerk/nextjs';
import {  StreamI18nProvider, StreamVideo,  StreamVideoClient,} from '@stream-io/video-react-sdk';
 
import { ReactNode, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

 
import {Loading}from '@/components/Loading';


 type props = { children : React.ReactNode}


     const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

     const StreamVideoProvider = ({children}:props) => {

        const [videoClient , setVidoClient] = useState<StreamVideoClient>();
        const {user , isLoaded} = useUser();

       useEffect(()=>{

           if(!isLoaded || !user)return ;

           if(!apiKey) throw new Error('Stream API Key is Missing')

            const client = new StreamVideoClient({
                apiKey, 
                user :{
                    id : user?.id, name: user?.username || user?.id,
                    image: user?.imageUrl },
                    tokenProvider:tokenProvider
            })  

          
        
            setVidoClient(client)

        },[user , isLoaded]);


    if(!videoClient) return <Loading/>


    return (
      <StreamVideo client={videoClient}>
        {children}
       </StreamVideo>
    )
  }

  
 export default  StreamVideoProvider