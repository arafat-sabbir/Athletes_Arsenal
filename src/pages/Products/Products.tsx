import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/skeletonLoader/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useProducts from "@/hooks/getProducts";
import Container from "@/layout/Container/Container";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

export type TProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stockCount: number;
  vendor: string;
  productImages: string[];
};

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageSize] = useState(10);
  const categories = ["cardio", "strength", "yoga", "accessories", "recovery"];
  const [searchTerm, setSearchTerm] = useState("");
  const query= {
    searchTerm,
    page: currentPage,
    categories: selectedCategories,
  };
  const { data, isLoading, isError } = useProducts(query);
  const totalPages = Math.ceil(data?.totalProduct / pageSize);
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm((e.currentTarget.elements.namedItem('title') as HTMLInputElement).value);
  };
  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };

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

  if (isError) {
    return (
      <div className="text-center text-red-500">Error loading products</div>
    );
  }

  return (
    <Container className=" py-10">
      {/* Category Filters */}
      <form
        onSubmit={handleSearch}
        className="flex  border-2 border-gray-300 rounded-full pl-2 mb-6 w-2/3 mx-auto"
      >
        <Input
          type="text"
          placeholder="Search"
          name="title"
          className="rounded-full border-0 "
        />
        <button className=" bg-white px-6 rounded-full">
          <Search />
        </button>
      </form>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((name) => (
          <div
            key={name}
            className={`py-1 px-4 rounded-full cursor-pointer transition duration-300 ${
              selectedCategories.includes(name)
                ? "bg-red-500 text-white"
                : "bg-gray-300/60 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryClick(name)}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
        ))}
      </div>
      {isLoading && (
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden 2xl:grid-cols-4 gap-10 py-10 justify-center items-center justify-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </Container>
      )}
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.products.map((product: TProduct) => (
          <ProductCard key={product._id} item={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-6 items-center py-8">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </Button>
        <span className="text-gray-700">{currentPage}</span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Products;
