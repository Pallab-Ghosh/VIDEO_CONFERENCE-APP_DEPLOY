import React from 'react'
import { Sidebar } from './_components/Sidebar'
import { Navbar } from './_components/nav-bar'
import { Metadata } from 'next';
 

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video Calling App",
  icons :{
    icon :'/icons/logo.svg'
  }
};


type HomelayoutProps = {
    children : React.ReactNode
}


const Homelayout = ({children}:HomelayoutProps) => {
  return (
    <main className='relative'>
       <Navbar/>
       <div className='flex'>
            <Sidebar/>
             <section className='flex bg-dark-2 min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
                 <div className='w-full'>
                    {children}
                 </div>
             </section>
       </div>   
    </main>
  )
}

export default Homelayout