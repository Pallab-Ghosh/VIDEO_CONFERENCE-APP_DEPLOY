import StreamVideoProvider from '@/provider/StreamClientProvider'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video Calling App",
  icons :{
    icon :'/icons/logo.svg'
  }
};


type ApplayoutProps = {
    children : React.ReactNode
}
const Applayout = ({children}:ApplayoutProps) => {
  return (
   
    <main>
      <StreamVideoProvider>
         {children}
      </StreamVideoProvider>
    </main>
  )
}

export default Applayout