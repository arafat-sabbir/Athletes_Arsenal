import useFetchData from "@/hooks/FetchData";

export const useRefetchCartProduct = () => {
  const { refetch: refetchCartProduct } = useFetchData("/cart/get-my-cart");
  return refetchCartProduct;
};
