
import CallList from '@/components/CallList';

  
const Recordingspage = () => {

  

  return (
    <section className=' flex size-full flex-col gap-10 text-white'>
       <h1 className= 'text-2xl font-semibold'> Recordingspage </h1>
        <CallList calltype ="recordings"/>
   </section>
  )
}

export default Recordingspage

 