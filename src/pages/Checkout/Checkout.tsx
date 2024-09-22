/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/redux/features/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import useMyCart from "@/hooks/GetMyCart";
import Container from "@/layout/Container/Container";
import { TCartProduct } from "@/types/user/product";
import { TUser } from "@/types/user/user";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import generateImage from "@/utils/generateImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import { CheckoutFormValidation } from "@/lib/validation";
import { toast } from "sonner";
import { z } from "zod";
import useAxiosSecure from "@/hooks/AxiosSecure";
import { TAddress } from "@/types/address/address";

const Checkout = () => {
  const axios = useAxiosSecure();
  const user = useAppSelector(selectCurrentUser) as TUser;
  const { data } = useMyCart();
  const cartProducts = data?.products as TCartProduct[];
  const [myAddresses, setMyAddresses] = useState<TAddress[]>([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const getAddresses = async () => {
      try {
        const response = await axios.get("/address/get-my-addresses");
        setMyAddresses(response.data.data as TAddress[]);
      } catch (error: any) {
        console.log(error?.response?.data);
      }
    };
    getAddresses();
  }, [axios, refetch]);
  // State to track selected payment option
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // State for handling the dialogs
  const [isSelectAddressOpen, setIsSelectAddressOpen] = useState(false);
  const [isAddNewAddressOpen, setIsAddNewAddressOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<TAddress>(
    {} as TAddress
  );
  const [tempSelectedAddress, setTempSelectedAddress] = useState<TAddress>(
    {} as TAddress
  );

  // Payment handling logic
  const handleStripePayment = () => {
    console.log("Stripe payment initiated");
  };

  const handleCOD = () => {
    console.log("COD selected");
  };
  const [loading, setLoading] = useState<boolean>();
  // 2. Define a submit handler.

  const onSubmit = async (values: z.infer<typeof CheckoutFormValidation>) => {
    setLoading(true);
    try {
      const response = await axios.post("/address/add-new-address", values);
      toast.success(response?.data?.message);
      setIsAddNewAddressOpen(false);
      setIsSelectAddressOpen(true);
      setRefetch(true);
    } catch (error: any) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };
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
      <section >
        <h3 className="text-2xl font-medium mb-4 font-bai text-gray-900">
          Your Cart
        </h3>
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Product
                </th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">
                  Price
                </th>
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
                    <span className="text-gray-800 font-medium">
                      {item.product.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 font-bai text-right text-gray-900 font-semibold">
                    ${item.product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Selected Address */}
      <div className="py-8">
        <h3 className="text-2xl font-medium mb-4 font-bai text-gray-900">
          Shipping Address
        </h3>
        {selectedAddress?.fullName && (
          <Card
            key={selectedAddress._id}
            className={`p-4 border-2 ${
              selectedAddress?._id === selectedAddress._id
                ? "border-primary-500"
                : "border-gray-300"
            } rounded-lg shadow-md`}
          >
            <label className="flex items-start gap-4">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {selectedAddress.fullName}
                </span>
                <span className="text-gray-600">
                  {selectedAddress.area}, {selectedAddress.city},{" "}
                  {selectedAddress.buildingNo}, {selectedAddress.address}
                </span>
                <span className="text-gray-600">{selectedAddress.phone}</span>
              </div>
            </label>
          </Card>
        )}
      </div>
      {/* Payment Options */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 font-bai text-gray-900">
          Payment Options
        </h3>
        <div className="flex gap-6 items-center justify-between lg:flex-row flex-col ">
          <div className="gap-4 flex">
            <Button
            disabled
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
          {selectedPayment === "cod" && (
            <>
              {/* Address Selection with Card Design and Radio Button */}
              <Dialog
                open={isSelectAddressOpen}
                onOpenChange={setIsSelectAddressOpen}
              >
                <DialogTrigger>
                  <Button variant={"outline"}>Select Address</Button>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex justify-between pt-3 pb-6">
                    <h1 className="font-bai font-semibold tracking-wider text-xl">
                      Shipping Addresses
                    </h1>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSelectAddressOpen(false);
                        setIsAddNewAddressOpen(true);
                      }}
                    >
                      Add New Address
                    </Button>
                  </div>
                  <DialogHeader>
                    <DialogTitle className="font-bai">
                      Please Select A Delivery Address
                    </DialogTitle>
                    <div className="space-y-4 mt-4">
                      {myAddresses?.map((address) => (
                        <Card
                          key={address._id}
                          className={`p-4 border-2 ${
                            selectedAddress?._id === address._id
                              ? "border-primary-500"
                              : "border-gray-300"
                          } rounded-lg shadow-md`}
                        >
                          <label className="flex items-start gap-4">
                            <input
                              type="radio"
                              name="selectedAddress"
                              value={address._id}
                              checked={tempSelectedAddress?._id === address._id}
                              onChange={() => setTempSelectedAddress(address)}
                              className="h-5 w-5 text-primary-500 focus:ring-primary-500"
                            />
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {address.fullName}
                              </span>
                              <span className="text-gray-600">
                                {address.area}, {address.city},{" "}
                                {address.buildingNo}, {address.address}
                              </span>
                              <span className="text-gray-600">
                                {address.phone}
                              </span>
                            </div>
                          </label>
                        </Card>
                      ))}
                    </div>
                    <Button
                      disabled={!tempSelectedAddress?.fullName}
                      onClick={() => {
                        setIsSelectAddressOpen(false);
                        setSelectedAddress(tempSelectedAddress);
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isAddNewAddressOpen}
                onOpenChange={setIsAddNewAddressOpen}
              >
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="w-full max-w-[900px] p-20">
                  {/* You can adjust max-w size */}
                  <CheckoutForm onSubmit={onSubmit} loading={loading!} />
                  {/* Form for adding new address goes here */}
                </DialogContent>
              </Dialog>
            </>
          )}
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
            ? "Place Order"
            : "Select Payment Option"}
        </Button>
      </div>
    </Container>
  );
};

export default Checkout;
