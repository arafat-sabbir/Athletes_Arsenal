import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./AxiosPublic";

const useProducts = (page: number=0) => {
  const axiosPublic = useAxiosPublic();
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getProducts", page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product/products?page=${page}`);
      return res.data.data;  // Adjusted to return the whole data structure
    },
  });
  return { data, refetch, isLoading, isError };
};

export default useProducts;

