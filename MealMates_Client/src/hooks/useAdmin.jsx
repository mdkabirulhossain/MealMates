import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
   const user = useAuth();
   const axiosSecure = useAxiosSecure();

   //use tan stack query
   const{data: isAdmin} = useQuery({
        queryKey:[user?.email, 'isAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
           console.log(res.data);
            //In backend we send admin so here we return admin also
            return res.data?.admin;
        }
   })
   return [isAdmin];
};

export default useAdmin;