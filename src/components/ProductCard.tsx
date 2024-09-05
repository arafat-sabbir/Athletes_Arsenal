import { TProduct } from "@/pages/Products/Products";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ProductCard = ({ item }: { item: TProduct }) => {
  const { title, price, vendor, thumbnail } = item;
  return (
    <div className="max-w-[332px]  space-y-2 overflow-hidden">
      <img
        src={thumbnail}
        alt={title}
        className="hover:scale-105  transition duration-300"
      />
      <h3 className="font-medium text-primary tracking-wider capitalize">
        {vendor}
      </h3>
      <div className="flex justify-between pb-2">
        <h1 className="text-wrap w-9/12">{title}</h1>
        <p className="text-primary">${price}</p>
      </div>
      <Link to={`/product/${item._id}`} state={item} className="w-full">
        <Button  className="w-full">
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default ProductCard;
