import Container from "@/layout/Container/Container";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TProduct } from "../Products/Products";
import { Button } from "@/components/ui/button";
import useMutateData from "@/hooks/MutateData";
import { LoaderCircle } from "lucide-react";

const ProductDetail = () => {
  const { state }: { state: TProduct } = useLocation();
  const [currentSlider, setCurrentSlider] = useState(0);
  const product = state;
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCurrentSlider(
          currentSlider === product?.productImages?.length - 1
            ? 0
            : currentSlider + 1
        ),
      5000
    );
    return () => clearInterval(intervalId);
  }, [currentSlider, product?.productImages?.length]);

  const { mutate, isPending } = useMutateData("/cart/add-to-cart", {
    product: product?._id,
    quantity: 2,
  });
  return (
    <Container className="py-10">
      <div className="flex justify-center gap-10 lg:flex-row flex-col">
        <div className="flex flex-row-reverse justify-between flex-1">
          <div className="h-72 w-full transform overflow-hidden rounded-lg before:bg-black/50 sm:h-96 md:h-[540px] lg:gap-10">
            {product?.productImages.map((img, index) => {
              return (
                <div
                  className={`${
                    index === currentSlider
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  } absolute inset-0 duration-500 ease-linear`}
                  key={`index_${index}`}
                >
                  <img
                    src={img}
                    width="1200"
                    height="600"
                    alt={product?.title}
                    className={`h-full w-full object-cover duration-500 ease-linear ${
                      index === currentSlider ? "scale-100" : "scale-105"
                    }`}
                  />
                  <div className="absolute inset-0 flex flex-col bg-black/20 p-5 text-center text-white drop-shadow-lg"></div>
                </div>
              );
            })}
          </div>
          {/* slider container */}
          <div className="flex flex-col items-center justify-center gap-3 p-2">
            {product?.productImages.map((img, index) => {
              return (
                <img
                  key={index}
                  src={img}
                  width={1200}
                  height={600}
                  className={`h-6 w-10 bg-black/20 sm:h-8 md:h-12 md:w-20 ${
                    currentSlider === index
                      ? "opacity-100 ring ring-sky-500"
                      : "opacity-60"
                  } box-content cursor-pointer rounded-md md:rounded-lg`}
                  alt={product?.title}
                  onClick={() => setCurrentSlider(index)}
                />
              );
            })}
          </div>
        </div>
        <div className="flex-1 space-y-6 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product?.title}
          </h1>
          <p className="text-xl font-bold text-gray-900">৳{product?.price}</p>
          <p className="text-gray-700 leading-relaxed">
            {product?.description}
          </p>
          <p className="text-md font-medium text-gray-600">
            Vendor: {product?.vendor}
          </p>
          <Button
            disabled={isPending}
            className="w-full"
            onClick={() => {
              mutate();
            }}
          >
            {isPending ? (
              <>
                Adding <LoaderCircle className="animate-spin ml-2" size={20} />
              </>
            ) : (
              "Add To Cart"
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
};
export default ProductDetail;
