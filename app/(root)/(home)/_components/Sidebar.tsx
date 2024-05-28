 
import React from 'react'
import {SidebarRoutes } from './SidebarRoutes'

export const All_Routes =[
    {
        label :'Home',
        src : '/',
        icon : '/icons/home.svg'
    },

    {
        label :'Upcoming',
        src : '/upcoming',
        icon:'/icons/upcoming.svg'
    },

    {
        label :'Previous',
        src : '/previous',
        icon:'/icons/previous.svg'
    }
    ,
    {
        label :'Recordings',
        src : '/recordings',
        icon:'/icons/recordings.svg'
    },
    {
        label :'Personal Room',
        src : '/personal-room',
        icon:'/icons/add-personal.svg'
    }
]

export const Sidebar = () => {

  return (
    <aside className='stick min-h-screen max-md:hidden lg:w-[264px] justify-start'>
      <div className='mt-10 pt-10 flex flex-col gap-8 h-full'>
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
    </aside>
  )
}

