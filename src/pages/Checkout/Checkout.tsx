import { useAppSelector } from "@/redux/features/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import useMyCart from "@/hooks/GetMyCart";
import Container from "@/layout/Container/Container";
import { TCartProduct } from "@/types/user/product";
import { TUser } from "@/types/user/user";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import generateImage from "@/utils/generateImage";

const Checkout = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;
  const { data } = useMyCart();
  const cartProducts = data?.products as TCartProduct[];

  // State to track selected payment option
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  return (
    <Container className="max-w-6xl mx-auto px-4 py-8">
      {/* User Info */}
      <Card className="mb-8 p-6 shadow-lg border border-gray-200 rounded-lg">
        <div className="flex items-center gap-6">
          <img
            src={generateImage(user?.photo)}
            className="h-16 w-16 rounded-full object-cover border-2 border-primary-500 shadow-sm"
            alt={user?.name}
          />
          <div>
            <h2 className="text-2xl font-semibold font-bai text-gray-900">
              {user?.name}
            </h2>
            <p className="text-gray-600 font-bai text-sm">{user?.email}</p>
          </div>
        </div>
      </Card>

      {/* Cart Items in a Table */}
      <section className="mb-8">
        <h3 className="text-2xl font-medium mb-4 font-bai text-gray-900">
          Your Cart
        </h3>
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left font-medium text-gray-700">Product</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Quantity</th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts?.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                    <span className="text-gray-800 font-medium">{item.product.title}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">{item.quantity}</td>
                  <td className="px-6 py-4 text-right text-gray-900 font-semibold">
                    ${item.product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment Options */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 font-bai text-gray-900">
          Payment Options
        </h3>
        <div className="flex gap-6">
          <Button
            variant={selectedPayment === "stripe" ? "default" : "outline"}
            onClick={() => setSelectedPayment("stripe")}
            className="px-6 py-3"
          >
            Pay with Stripe
          </Button>
          <Button
            variant={selectedPayment === "cod" ? "default" : "outline"}
            onClick={() => setSelectedPayment("cod")}
            className="px-6 py-3"
          >
            Cash on Delivery
          </Button>
        </div>
      </section>

      {/* Payment Action */}
      <div className="mt-8 flex justify-end">
        <Button
          variant="default"
          onClick={() =>
            selectedPayment === "stripe" ? handleStripePayment() : handleCOD()
          }
          disabled={!selectedPayment}
          className="px-8 py-3 text-lg font-semibold font-bai"
        >
          {selectedPayment === "stripe"
            ? "Proceed with Stripe"
            : selectedPayment === "cod"
            ? "Confirm COD"
            : "Select Payment Option"}
        </Button>
      </div>
    </Container>
  );
};

// Payment handling logic
const handleStripePayment = () => {
  // Logic to handle Stripe payment
  console.log("Stripe payment initiated");
};

const handleCOD = () => {
  // Logic to handle Cash on Delivery
  console.log("COD selected");
};

export default Checkout;
