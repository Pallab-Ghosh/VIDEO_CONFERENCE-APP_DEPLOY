'use client'

import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useCall, Icon } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


 const MyFeedbackForm = () => {

  const call = useCall();
  const [rating, setRating] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const {user} = useUser();
  const {toast}= useToast()
  const router = useRouter();

  const handleSubmitFeedback = useCallback(() => {
    
    if(!user)
      {
        alert('You must be logged in to submit feedback.');
        return;
      }
    

      try 
      {
        call?.submitFeedback(Math.min(Math.max(1, rating), 5), {
          reason: message,
          custom: {  email,},
        });
        toast({title : 'Review submitted'})
      } 
      catch (error) {
        toast({title : 'Something is wrong'})
      }

      finally{
           setRating(0);
           setEmail('')
           setMessage('')
      }

  
  
  }, [call, email, message, rating]);

  return (
    <div className="text-white  h-screen  flex justify-center items-center w-full">
         
          <div className=' flex justify-center items-center flex-col gap-5 bg-slate-900 h-[700px] md:w-[500px] w-full'>
          <Image src="/image/Teams-calling.webp" alt='team' width={200} height={300} />
               <h2 className=' text-white'> How was your call? </h2>
                <div className="flex items-center">
                    <div className=' font-bold'>Rate quality:</div>
                    <Rating style={{ maxWidth: 190 ,  }} value={rating} onChange={setRating} />
                </div>


                <div className='flex flex-col gap-5 min-w-60 '>
                      <Input
                        type="email"
                        placeholder="E-Mail"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className=' rounded-lg text-slate-800'
                      />

                      <Textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className=' rounded-lg text-slate-800'
                      />

                      <div className=' flex gap-2'>
                        <Button className=' w-40 bg-blue-600 rounded-full' onClick={handleSubmitFeedback}>
                            Submit
                          </Button>

                          <Button className=' w-40 bg-blue-600 rounded-full' onClick={()=>router.push('/')}>
                            Home
                          </Button>
                      </div>
                </div>
          </div>
    </div>
  );
};

export default MyFeedbackForm