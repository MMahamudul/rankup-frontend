import { useQuery } from '@tanstack/react-query'
import Container from '../Shared/Container'
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
    <Container>
      {
        contests && contests.length > 0 ? (
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'>
        {
          contests.map(contest => <Card key ={contest._id} contest={contest}/> )
        }
      </div>
        ): null
      }
    </Container>
  )
}

export default Contests
