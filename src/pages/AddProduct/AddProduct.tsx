/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { AddProductValidation } from "@/lib/validation";
import Container from "@/layout/Container/Container";
import { Link, useNavigate } from "react-router-dom";
import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { FormFieldType } from "@/components/form/LoginForm";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import useAxiosSecure from "@/hooks/AxiosSecure";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export type TProduct = {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stockCount: number;
  vendor: string;
  productImages: string[];
};

const AddProduct = ({ className }: { className?: string }) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null); // Thumbnail image
  const [productImages, setProductImages] = useState<File[]>([]); // Product images
  const axios = useAxiosSecure();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof AddProductValidation>>({
    resolver: zodResolver(AddProductValidation),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      stockCount: "",
      vendor: "",
    },
  });

  // Dropzone for Thumbnail
  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => setThumbnail(acceptedFiles[0]),
    multiple: false,
  });

  // Dropzone for Product Images
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) =>
      setProductImages([...productImages, ...acceptedFiles]),
    multiple: true,
  });

  const handleImageRemove = (index: number) => {
    const updatedImages = productImages.filter((_, i) => i !== index);
    setProductImages(updatedImages);
  };

  const thumbnailSrc = thumbnail
    ? URL.createObjectURL(thumbnail)
    : "/assets/product/upload.png";
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof AddProductValidation>) => {
    setLoading(true);

    // Check if thumbnail and productImages are set
    if (!thumbnail) {
      toast.error("Please select a thumbnail image");
      setLoading(false);
      return;
    }

    if (productImages.length === 0) {
      toast.error("Please select at least one product image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    for (const key in values) {
      if (values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    }

    // Append the thumbnail and product images to formData
    formData.append("image", thumbnail);
    productImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      console.log("Submitting API");
      const result = await axios.post("/product/add-product", formData);
      console.log("Submitted API");
      console.log(result?.data);
      toast.success(result?.data?.message);
      navigate("/manage_products");
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Log form errors for debugging

  return (
    <Container className="flex justify-center items-center h-[900px] p-4 relative my-32">
      <div className="mx-auto w-full max-w-2xl space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-3xl font-medium text-center mb-10">Add Product</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-6 flex-1", className)}
          >
            {/* Title */}
            <CustomFormField
              control={form.control}
              className="rounded-none border"
              fieldType={FormFieldType.INPUT}
              name="title"
              placeholder="Enter Product Title"
            />

            {/* Description */}
            <CustomFormField
              control={form.control}
              className="rounded-none border"
              fieldType={FormFieldType.TEXTAREA}
              name="description"
              placeholder="Enter Product Description"
            />

            {/* Price */}
            <CustomFormField
              control={form.control}
              className="rounded-none border"
              fieldType={FormFieldType.INPUT}
              name="price"
              placeholder="Enter Product Price"
              type="number"
            />

            {/* Category */}
            <CustomFormField
              control={form.control}
              className="rounded-none border"
              fieldType={FormFieldType.INPUT}
              name="category"
              placeholder="Enter Product Category"
            />

            {/* Stock Count */}
            <CustomFormField
              control={form.control}
              className="rounded-none border"
              fieldType={FormFieldType.INPUT}
              name="stockCount"
              placeholder="Enter Stock Count"
              type="number"
            />

            {/* Vendor */}
            <CustomFormField
              control={form.control}
              className="rounded-none border"
              fieldType={FormFieldType.INPUT}
              name="vendor"
              placeholder="Enter Vendor Name"
            />

            {/* Thumbnail Dropzone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Upload Thumbnail
              </label>
              <div
                {...getThumbnailRootProps({
                  className:
                    "dropzone flex justify-center items-center border-2 border-dashed border-zinc-300 rounded-lg p-4 text-center cursor-pointer",
                })}
              >
                <input {...getThumbnailInputProps()} />
                <img
                  src={thumbnailSrc}
                  alt="Thumbnail"
                  className="w-40 h-40 object-cover"
                />
              </div>
            </div>

            {/* Product Images Dropzone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Upload Product Images
              </label>
              <div
                {...getRootProps({
                  className:
                    "dropzone border-dashed border-2 p-4 mt-2 flex justify-center items-center text-center cursor-pointer rounded-lg",
                })}
              >
                <input {...getInputProps()} />
                <p>Drag 'n' drop images here, or click to select files</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                {productImages.length > 0 ? (
                  productImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Product Image ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm">No images uploaded yet</p>
                )}
              </div>
            </div>

            <Button
              disabled={loading}
              className="mt-4 bg-primary mx-auto lg:mx-0 w-full"
            >
              Add Product {loading && <Loader className="animate-spin ml-2" />}
            </Button>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default AddProduct;
