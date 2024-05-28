import CallList from '@/components/CallList'
import React from 'react'

const Upcomingpage = () => {
  return (
    <section className=' flex size-full flex-col gap-10 text-white'>
       <h1 className= 'text-2xl font-semibold'> Upcoming Meetings </h1>
       <CallList calltype ="upcoming"/>
   </section>
  )
}

export default Upcomingpage