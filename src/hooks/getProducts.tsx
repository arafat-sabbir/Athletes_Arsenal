import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./AxiosPublic";

const useProducts = (page: number=0,categories?: string[]) => {
  const categoryQuery = categories?.length
  ? `&categories=${categories.join(",")}`
  : "";
  const axiosPublic = useAxiosPublic();
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getProducts", page,categoryQuery],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product/products?page=${page}${categoryQuery}`);
      return res.data.data;  // Adjusted to return the whole data structure
    },
  });
  return { data, refetch, isLoading, isError };
};

export default useProducts;

