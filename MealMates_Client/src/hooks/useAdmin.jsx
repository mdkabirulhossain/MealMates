import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
  
    const { data: isAdmin , isPending: isAdminLoading} = useQuery({
      queryKey: ['isAdmin', user?.email],
      queryFn: async () => {
        if (!user?.email) {
          console.error('User email is missing!');
          return false;
        }
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        console.log('Response from backend:', res.data);
        return res.data?.admin;
      },
      enabled: !!user?.email,
    });
  
    return [isAdmin, isAdminLoading];
  };
  

export default useAdmin;