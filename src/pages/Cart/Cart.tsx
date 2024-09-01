import useFetchData from "@/hooks/FetchData";
import Container from "@/layout/Container/Container";
import ProductCard from "@/components/ProductCard";

const Cart = () => {
  const { data: cartProduct } = useFetchData("/cart/get-my-cart", true);

  return (
    <Container className="py-10 min-h-[75vh]">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {cartProduct?.map((product:any) => (
        <ProductCard item={product?.product}></ProductCard>
      ))}
    </div>
    </Container>
  );
};

export default Cart;
