/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";

const useFetchData = (path: string, params = {}) => {
  const axios = useAxiosSecure();
  const key = path.split("/")[1];
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [key, params],
    queryFn: async () => {
      const res = await axios.get(path, { params });
      return res.data.data;
    },
  });

  return { data, refetch, isLoading, isError };
};

export default useFetchData;
