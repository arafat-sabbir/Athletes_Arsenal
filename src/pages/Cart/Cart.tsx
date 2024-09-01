import useFetchData from "@/hooks/FetchData";
import Container from "@/layout/Container/Container";

const Cart = () => {
  const { data: cartProduct } = useFetchData(
    "/cart/get-my-cart",
    true
  );
  return <Container>Cart{cartProduct?.length}</Container>;
};

export default Cart;
