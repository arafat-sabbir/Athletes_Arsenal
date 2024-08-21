import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./AxiosPublic";

const useProducts = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product/products`);
      return res.data.data;
    },
  });
  return { products, refetch, isLoading, isError };
};

export default useProducts;
