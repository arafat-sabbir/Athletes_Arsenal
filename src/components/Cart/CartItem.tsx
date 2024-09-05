/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/FormatCurrency";
import { Link } from "react-router-dom";

const CartItem = ({ item }: { item: any }) => {
  const { product, quantity } = item;
  const { title, price, vendor, thumbnail } = product;

  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="w-24">
        <img
          src={thumbnail}
          alt={title}
          className="rounded-lg w-full h-auto object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 space-y-1">
        <h3 className="font-medium text-lg">
          <Link to={`/product/${product._id}`}>{title}</Link>
        </h3>
        <p className="text-gray-500 text-sm">Sold by: {vendor}</p>
        <div className="flex items-center space-x-2">
          <span>Qty: </span>
          <input
            type="number"
            className="w-16 border rounded p-1 text-center"
            value={quantity}
            min={1}
          />
        </div>
      </div>

      {/* Price Details */}
      <div className="text-right">
        <p className="text-lg font-semibold">{formatCurrency(price)}</p>
        <Button className="mt-2" variant="link" onClick={() => {/* Handle remove from cart */}}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
