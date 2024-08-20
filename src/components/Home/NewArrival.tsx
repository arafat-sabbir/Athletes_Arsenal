import Container from "@/layout/Container/Container";
import ProductCard from "../ProductCard";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const NewArrival = () => {
  const items = [
    {
      title: "Full Elastic Track Pant",
      vendor: "IgniteFit Studio",
      price: 120,
      thumbnail: "/assets/product/pant.jpg",
    },
    {
      title: "Full Elastic Track Pant",
      vendor: "IgniteFit Studio",
      price: 120,
      thumbnail: "/assets/product/pant.jpg",
    },
    {
      title: "Full Elastic Track Pant",
      vendor: "IgniteFit Studio",
      price: 120,
      thumbnail: "/assets/product/pant.jpg",
    },
    {
      title: "Full Elastic Track Pant",
      vendor: "IgniteFit Studio",
      price: 120,
      thumbnail: "/assets/product/pant.jpg",
    },
    {
      title: "Full Elastic Track Pant",
      vendor: "IgniteFit Studio",
      price: 120,
      thumbnail: "/assets/product/pant.jpg",
    },
    {
      title: "Full Elastic Track Pant",
      vendor: "IgniteFit Studio",
      price: 120,
      thumbnail: "/assets/product/pant.jpg",
    },
    {
      title: "Full Elastic Track Pant",
      vendor: "IgniteFit Studio",
      price: 120,
      thumbnail: "/assets/product/pant.jpg",
    },
    {
      title: "Full Elastic Track Pant",
      vendor: "IgniteFit Studio",
      price: 120,
      thumbnail: "/assets/product/pant.jpg",
    },
  ];
  return (
    <Container className="pb-20">
      <div className="space-y-2">
        <h3 className="text-2xl font-medium text-primary text-center">
          Featured Products
        </h3>
        <h1 className="text-4xl font-medium text-center tracking-wider ">
          Top Brand Products
        </h1>
        <p className="text-center tracking-wider text-sm">
          Choose From Thousand Of Our Latest Product <br />
          All Of Our Product ar from Top Brand
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden 2xl:grid-cols-4 gap-10 py-10">
        {items.map((item, index) => (
          <ProductCard item={item} key={index}></ProductCard>
        ))}
      </div>
        <Link to={"/products"}><Button size={"xxl"} className="mx-auto flex">Explore More</Button></Link>
    </Container>
  );
};

export default NewArrival;
