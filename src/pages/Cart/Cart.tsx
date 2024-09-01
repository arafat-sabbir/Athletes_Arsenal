import useFetchData from "@/hooks/FetchData";
import Container from "@/layout/Container/Container";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hooks";

const Cart = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log(user);
  const { data: cartProduct, isLoading } = useFetchData(
    "/cart/get-my-cart",
    !!user
  );
  return <Container>Cart{cartProduct?.length}</Container>;
};

export default Cart;
