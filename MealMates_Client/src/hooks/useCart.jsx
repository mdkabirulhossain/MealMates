import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
    const{user} = useAuth();
    //Tan Stack Query
    const axiosSecure = useAxiosSecure();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            return res.data;
            
          },
      })
      //Here we pass as a array so when we destruc this array we use array [] sign
      return [cart, refetch]
};

export default useCart;