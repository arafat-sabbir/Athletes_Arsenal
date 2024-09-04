import { useQuery } from "@tanstack/react-query";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hooks";
import useAxiosSecure from "./AxiosSecure";

const useMyCart = () => {
  const axios = useAxiosSecure();
  const user = useAppSelector(selectCurrentUser);
  // Determine if the query should be enabled based on `enabled` parameter and user existence
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axios.get("/cart/get-my-cart");
      return res.data.data;
    },
    enabled: !!user,
  });
};

export default useMyCart;
