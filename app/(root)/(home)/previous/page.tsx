import CallList from '@/components/CallList'


const Previouspage = () => {
  return (
    <section className=' flex size-full flex-col gap-10 text-white'>
      <h1 className= 'text-2xl font-semibold'>   Previous Meetings  </h1>
      <CallList calltype ="ended"/>
    </section>
  )
}

export default Previouspage