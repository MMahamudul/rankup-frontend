import { useQuery } from '@tanstack/react-query'
import Card from './Card'
import useAxiosSecure from '../../hooks/useAxiosSecure'



const Contests= () => {
  const axiosSecure = useAxiosSecure()
  const {data: contests} = useQuery({
     queryKey: ['contests'], 
     queryFn: async()=>{
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/all-contests`)
      return result.data;
      
      
     }
  })
 
  return (
    <div>
      <h1 className="text-blue-900 text-3xl text-center font-bold">All Contests</h1>
      {
        contests && contests.length > 0 ? (
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'>
        {
          contests.map(contest => <Card key ={contest._id} contest={contest}/> )
        }
      </div>
        ): null
      }
    </div>
  )
}

export default Contests
