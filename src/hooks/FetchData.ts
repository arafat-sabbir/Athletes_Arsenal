import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./AxiosPublic";

const useFetchData = (path: string, enabled: boolean = false) => {
  const axios = useAxiosPublic();
  const key = path.split("/")[1];

  // Determine if the query should be enabled based on `enabled` parameter and user existence

  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(path);
      return res.data.data;
    },
    enabled: enabled, // Query will run based on `queryEnabled` condition
  });
};

export default useFetchData;
