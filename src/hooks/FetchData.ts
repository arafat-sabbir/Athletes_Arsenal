/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";

const useFetchData = (path: string,enabled?: any) => {
  const axios = useAxiosSecure();
  const key = path.split("/")[1];
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(path);
      return res.data.data;
    },
    enabled: enabled,
  });

  return { data, refetch, isLoading, isError };
};

export default useFetchData;
