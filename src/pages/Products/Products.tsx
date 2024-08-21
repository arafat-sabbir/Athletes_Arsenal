
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import useProducts from "@/hooks/getProducts";
import Container from "@/layout/Container/Container";
import { useState } from "react";

export type TProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stockCount: number;
  vendor: string;
};

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useProducts(currentPage);
  console.log(data);
  const [pageSize] = useState(10);
  const totalPages = Math.ceil(data?.totalProduct / pageSize); // Calculate total pages

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden 2xl:grid-cols-4 gap-10 py-10">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error loading products</div>
        ) : (
          data?.products?.map((product: TProduct) => (
            <ProductCard key={product._id} item={product} />
          ))
        )}
      </div>
      <div className="flex justify-center gap-10 items-center py-6">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        {currentPage}
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Products;