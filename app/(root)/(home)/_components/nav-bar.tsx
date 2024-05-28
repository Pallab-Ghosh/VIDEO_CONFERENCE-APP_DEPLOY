import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'

export const Navbar = () => {
  return (
 
      <nav className='z-50 flex fixed w-full bg-dark-1 px-6 py-4 lg:px-10'>
          <Link className='flex items-center gap-1' href="/">
              <Image
              src='/icons/logo.svg'
              alt='app_logo'
              height={32}
              width={32}
              className='max-sm:size-20'
              />
              <p className=' text-[26px] font-extrabold text-white max-sm:hidden '>Yoom</p>
          </Link>

          <div className='flex flex-1 justify-end'>
              <div className='flex gap-5'>
                  <div className='mt-5'><MobileNav/></div>
                  <SignedIn>
                    <UserButton/>
                  </SignedIn>
              </div>
          </div>
      </nav>
   
  )
}

