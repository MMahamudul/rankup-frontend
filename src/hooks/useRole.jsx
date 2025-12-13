import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query'
/* import useAxios from './useAxios'; */
import useAxiosSecure from './useAxiosSecure';



const useRole = () => {
    /* const instances = useAxios() */
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();
    const {data: role, isLoading: isRoleLoading} = useQuery({
         enabled:!loading && !!user?.email,
         queryKey: ['role' , user?.email],
         queryFn: async()=>{
         const {data} = await axiosSecure('/user/role')
             
            return data.role;
         },

    })
   return {role, isRoleLoading}
};

export default useRole;
