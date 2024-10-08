/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/layout/Container/Container";
import { Button } from "@/components/ui/button";
import useMyCart from "@/hooks/GetMyCart";
import CartItem from "@/components/Cart/CartItem";
import { formatCurrency } from "@/utils/FormatCurrency";
import CartSkeleton from "@/components/Cart/CartSkeleton";
import NotFound from "@/components/NotFound";
import { Link } from "react-router-dom";

const Cart = () => {
  const { data, isLoading, isPending } = useMyCart();
  const cartProducts = data?.products;
  const cartSubtotal = data?.totalPrice;
  if (isLoading || isPending) {
    return <CartSkeleton />;
  }
  return (
    <Container className="py-10 min-h-[75vh]">
      {cartProducts?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartProducts.map((cartItem: any) => (
              <CartItem key={cartItem.product._id} item={cartItem} />
            ))}
          </div>
          {/* Cart Summary */}
          <div className="p-6 border rounded-lg shadow-md bg-gray-50 max-h-[250px]">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(cartSubtotal)}</span>
              </div>
            </div>
            <Link to={"/checkout"}>
              <Button className="w-full mt-6">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      ) : (
        <NotFound title="Your Cart Is Empty"></NotFound>
      )}
    </Container>
  );
};

export default Cart;
