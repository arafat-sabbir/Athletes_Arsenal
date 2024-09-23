import { useQuery } from "@tanstack/react-query";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hooks";
import useAxiosSecure from "./AxiosSecure";

const useMyProducts = () => {
  const axios = useAxiosSecure();
  const user = useAppSelector(selectCurrentUser);

  // If there is no user, return an empty query result to prevent the API request
  const userId = user?.userId;

  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      if (!userId) return Promise.reject(new Error("User not authenticated"));
      
      const res = await axios.get("/product/get-my-products");
      return res.data.data;
    },
    enabled: Boolean(userId), // Enable only if userId exists
  });
};

export default useMyProducts;
