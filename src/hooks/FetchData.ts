import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";
import { useAppSelector } from "@/redux/features/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const useFetchData = (path: string, enabled: boolean = false) => {
  const user = useAppSelector(selectCurrentUser);

  const axios = useAxiosSecure();
  const key = path.split("/")[1];

  // Determine if the query should be enabled based on `enabled` parameter and user existence
  const queryEnabled = enabled ? !!user : true;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(path);
      return res.data.data;
    },
    enabled: queryEnabled // Query will run based on `queryEnabled` condition
  });

  return { data, refetch, isLoading, isError };
};

export default useFetchData;
