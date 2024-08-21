// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form } from "@/components/ui/form";
// import { cn } from "@/lib/utils";
// import { AddProductValidation, LoginFormValidation } from "@/lib/validation";
// import Container from "@/layout/Container/Container";
// import { toast } from "sonner";
// import { Link, useNavigate } from "react-router-dom";
// import useAxiosPublic from "@/hooks/AxiosPublic";
// import { useAppDispatch } from "@/redux/features/hooks";
// import { decodeToken } from "@/utils/decodeToken";
// import { setUser, TUser } from "@/redux/features/auth/authSlice";
// import CustomFormField from "@/components/CustomFormField";
// import { Button } from "@/components/ui/button";
// import { FormFieldType } from "@/components/form/LoginForm";

// const AddProduct = ({ className }: { className?: string }) => {
//   const axios = useAxiosPublic();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const form = useForm<z.infer<typeof AddProductValidation>>({
//     resolver: zodResolver(AddProductValidation),
//     defaultValues: {
//       email: "",
//       photo: undefined,
//     },
//   });
//   const onSubmit = async (values: z.infer<typeof AddProductValidation>) => {
//     console.log(values);
//   };
//   return (
//     <Container className="flex justify-center items-center h-screen relative">
//       <div className="mx-auto w-full max-w-xl space-y-6 rounded-lg border bg-white p-10 shadow-lg sm:p-20 dark:border-zinc-700 dark:bg-zinc-900">
//         <h1 className="text-3xl font-medium text-center mb-10">Welcome Back</h1>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className={cn("space-y-6 flex-1", className)}
//           >
//             <CustomFormField
//               control={form.control}
//               className=" rounded-none border"
//               fieldType={FormFieldType.INPUT}
//               name="email"
//               placeholder="Enter Your Email"
//               iconAlt="user"
//             />
//             <CustomFormField
//               control={form.control}
//               className=" rounded-none"
//               fieldType={FormFieldType.INPUT}
//               type="file"
//               accept="image/*"
//               multiple={true}
//               name="photo"
//               placeholder="Enter Your Password"
//               iconAlt="user"
//             />
//             <Button className="mt-4 bg-primary mx-auto lg:mx-0 w-full">
//               Add
//             </Button>
//           </form>
//         </Form>
//         <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
//           Don&apos;t have an account?
//           <Link to="/register" className="font-semibold underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </Container>
//   );
// };
// export default AddProduct;
