import { TProduct } from "@/pages/Products/Products";

const ProductCard = ({ item }: { item: TProduct }) => {
  const { title, price, vendor, thumbnail } = item;
  return (
    <div className="max-w-[332px] max-h-[478x] space-y-2 overflow-hidden">
      <img
        src={thumbnail}
        alt={title}
        className="hover:scale-105 h-[372px] w-[332px] transition duration-300"
      />
      <h3 className="font-medium text-primary tracking-wider cap">{vendor}</h3>
      <div className="flex justify-between">
        <h1 className="text-wrap w-9/12">{title}</h1>
        <p className="text-primary">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
