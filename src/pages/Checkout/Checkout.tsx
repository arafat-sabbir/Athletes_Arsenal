import useMyCart from "@/hooks/GetMyCart";
import Container from "@/layout/Container/Container";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hooks";

const Checkout = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useMyCart();
  const cartProducts = data?.products;
  console.log(cartProducts);
  return <Container>Checkout</Container>;
};

export default Checkout;
