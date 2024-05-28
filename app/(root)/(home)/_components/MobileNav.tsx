import React from 'react'

import {Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,SheetTrigger,} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { All_Routes, Sidebar } from './Sidebar'
import Image from 'next/image'
import Link from 'next/link'
import { SidebarRoutes } from './SidebarRoutes'
 


const MobileNav = () => {
  return (
    <section className='w-full max-w-[264px] md:hidden'>
         <Sheet>
      <SheetTrigger asChild>
        <Image src='/icons/hamburger.svg' alt='close' height={36} width={36} className=' cursor-pointer ' />
      </SheetTrigger>

      <SheetContent side='left' className=' border-none bg-dark-1'>
            <SheetHeader>
                <p className=' font-medium text-2xl text-zinc-200 pb-12'>Welcome to Yoom</p>
            </SheetHeader> 
            <Link className='flex items-center gap-1' href="/">
              <Image
              src='/icons/logo.svg'
              alt='app_logo'
              height={32}
              width={32}
              className='max-sm:size-20 cursor-pointer'
              />
              <p className=' text-[26px] font-extrabold text-white'>Yoom</p>
          </Link>  

           <div className='flex h-[calc(100vh - 72px)] flex-col justify-between overflow-y-auto'>
               
                    <div className='mt-10 pt-10 flex flex-col gap-8 h-full cursor-pointer'>
                            {
                            All_Routes.map((route)=>(
                                <SidebarRoutes
                                key ={route.src}
                                label={route.label}
                                src={route.src}
                                icon ={route.icon}
                                />
                            ))
                            }
                    </div>
               
           </div>
           <SheetClose asChild>
               <div className=' flex justify-center mt-6 w-full'>
                  <Button className=' bg-white text-black w-full'>Close</Button>
               </div>
           </SheetClose>
        </SheetContent>

    </Sheet>
    </section>
  )
}

export default MobileNav