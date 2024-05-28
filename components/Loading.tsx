import Image from 'next/image'
import React from 'react'

export const Loading = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
    <Image 
     src = '/icons/loading.svg'
     alt='loader'
     width={50}
     height={50}
    />
</div>
  )
}

