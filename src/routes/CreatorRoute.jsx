import { Navigate } from 'react-router'
import useRole from './../hooks/useRole';
import Loading from '../components/Shared/Loading';


const CreatorRoute = ({ children }) => {
  const {role, isRoleLoading} = useRole()

  if (isRoleLoading) return <Loading />
  if (role === 'creator') return children
  return <Navigate to='/' replace='true' />
}

export default CreatorRoute