import { useQuery } from '@tanstack/react-query'
import Container from '../Shared/Container'
import axios from 'axios'
import Card from './Card'



const Contests= () => {
  const {data: contests} = useQuery({
     queryKey: ['contests'], 
     queryFn: async()=>{
      const result = await axios(`${import.meta.env.VITE_API_URL}/contests`)
      return result.data;
      /* console.log(result.data) ; */
      
     }
  })
 
  return (
    <Container>
      {
        contests && contests.length > 0 ? (
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
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
