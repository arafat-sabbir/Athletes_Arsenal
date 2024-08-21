import ProductCard from "@/components/ProductCard";
import useProducts from "@/hooks/getProducts";
import Container from "@/layout/Container/Container";

export type TProduct = {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stockCount: number;
  vendor: string;
};

const Products = () => {
  const { products } = useProducts();
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden 2xl:grid-cols-4 gap-10 py-10">
        {products?.map((product: TProduct, index: number) => (
          <ProductCard key={index} item={product} />
        ))}
      </div>
    </Container>
  );
};

export default Products;
