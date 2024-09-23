import { Button } from "@/components/ui/button";
import Container from "@/layout/Container/Container";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  return (
    <Container>
      <h1>Product Management</h1>
      <Link to="/add-product">
        <Button>Add New Product</Button>
      </Link>
    </Container>
  );
};

export default ProductManagement;
