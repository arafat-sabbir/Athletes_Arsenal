import Container from "@/layout/Container/Container";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useMutateData from "@/hooks/MutateData";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import useFetchData from "@/hooks/FetchData";
import { TProduct } from "../Products/Products";

const ProductDetail = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { id } = useParams();
  const { data } = useFetchData(`/product/${id}`);
  const product: TProduct = data;

  // Quantity State To Add Product To Cart
  const [quantity, setQuantity] = useState(1);

  const [currentSlider, setCurrentSlider] = useState(0);

  // Slider Image Change Handler
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

  // Scroll To Top Of The Page

  // Add TO Cart Mutation Handler
  const { mutate, isPending } = useMutateData(
    "post",
    "/cart/add-to-cart",
    {
      product: product?._id,
      quantity,
    },
    ["cart,product"]
  );
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
        <div className="flex-1 space-y-6 p-6 bg-white dark:bg-[#1B1B1B] rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-title-dark">
            {product?.title}
          </h1>
          <p className="text-xl font-bold text-title-dark">৳{product?.price}</p>
          <p className="text-title-dark leading-relaxed">
            {product?.description}
          </p>
          <p className="text-md font-medium text-title-dark">
            Vendor: {product?.vendor}
          </p>
          <div className="flex items-center justify-center gap-6">
            {/* Quantity Handler button */}
            <div className="flex items-center gap-2">
              {/* Decrease Quantity If Quantity is more than 1 */}
              <Button
                variant={"outline"}
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </Button>
              <h1 className="w-[30px] mx-auto text-center"> {quantity}</h1>
              <Button
                variant={"outline"}
                onClick={() => {
                  if (quantity < product?.stockCount) setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </div>
            {/* Decrease Quantity If StockCount is More Then 0 And Quantity is Less Then StockCount */}
            <Button
              disabled={isPending || product?.stockCount === 0}
              className="w-full"
              onClick={() => {
                if (product?.stockCount < 0 && quantity < product?.stockCount) {
                  toast.error("Out of Stock");
                  return;
                } else {
                  mutate();
                }
              }}
            >
              {isPending ? (
                <>
                  Adding
                  <LoaderCircle className="animate-spin ml-2" size={20} />
                </>
              ) : (
                "Add To Cart"
              )}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ProductDetail;
