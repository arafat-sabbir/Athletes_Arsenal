import { Button } from "@/components/ui/button";
import useMyProducts from "@/hooks/GetMyProducts";
import Container from "@/layout/Container/Container";
import { Link } from "react-router-dom";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Loader, PencilIcon, TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { TProduct } from "@/types/user/product";
import useAxiosSecure from "@/hooks/AxiosSecure";
import { toast } from "sonner";
import generateImage from "@/utils/generateImage";

// Skeleton loader component
const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
    </div>
  );
};

const ProductManagement = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: products, refetch, isLoading } = useMyProducts();
  const axios = useAxiosSecure();
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const result = await axios.delete(`/product/delete-product/${id}`);
      refetch();
      toast.success(result?.data?.message);
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Define table columns for all fields in TProduct
  const columns = useMemo<ColumnDef<TProduct>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <span>{row.original.title}</span>,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="truncate">{row.original.description}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => <span>${row.original.price.toFixed(2)}</span>,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <span>{row.original.category}</span>,
      },
      {
        accessorKey: "stockCount",
        header: "Stock Count",
        cell: ({ row }) => <span>{row.original.stockCount}</span>,
      },
      {
        accessorKey: "vendor",
        header: "Vendor",
        cell: ({ row }) => <span>{row.original.vendor}</span>,
      },
      {
        accessorKey: "productImages",
        header: "Images",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            {row.original.productImages.map((image, idx) => (
              <img
                key={idx}
                src={generateImage(image)}
                alt="Product Image"
                className="h-10 w-10 object-cover"
              />
            ))}
          </div>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Link to={`/edit-product/${row.original._id}`}>
              <Button className="bg-blue-500 text-white">
                <PencilIcon size={16} /> Edit
              </Button>
            </Link>
            <Button
              disabled={loading}
              className="bg-red-500 text-white"
              onClick={() => handleDelete(row.original._id)}
            >
              <TrashIcon size={16} /> Delete{" "}
              {loading && <Loader className="ml-2 animate-spin" />}
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Set up TanStack Table instance
  const table = useReactTable({
    data: products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container className="pb-40 pt-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Link to="/add-product">
          <Button className="bg-primary text-white">Add New Product</Button>
        </Link>
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg table-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2 text-left bg-gray-100 border-b whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2 whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center p-4">
                    <h1>No Product found</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default ProductManagement;
