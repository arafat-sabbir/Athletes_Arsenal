/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CustomFormField from "../CustomFormField";
import { RegisterFormValidation } from "@/lib/validation";
import Container from "@/layout/Container/Container";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../BackToHome";
import useAxiosPublic from "@/hooks/AxiosPublic";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "text_area",
  PHONE_INPUT = "phone_input",
  SELECT = "select",
}
const RegisterForm = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const axios = useAxiosPublic();
  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof RegisterFormValidation>) => {
    try {
      const response = await axios.post("/user/register", values);
      toast.success("Register Successful");
      console.log(response);
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Container className="flex justify-center items-center h-screen relative">
      <BackToHome />
      <div className="mx-auto w-full max-w-xl space-y-8 rounded-lg border bg-white p-10 shadow-lg sm:p-20 dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold text-center">Sing Up</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-6 flex-1", className)}
          >
            <CustomFormField
              control={form.control}
              className=" rounded-none"
              fieldType={FormFieldType.INPUT}
              name="name"
              placeholder="Enter Your Name"
              iconAlt="user"
            />
            <CustomFormField
              control={form.control}
              className=" rounded-none"
              fieldType={FormFieldType.INPUT}
              name="email"
              placeholder="Enter Your Email"
              iconAlt="email"
            />

            <CustomFormField
              control={form.control}
              className=" rounded-none"
              fieldType={FormFieldType.INPUT}
              name="password"
              placeholder="Enter Your Password"
              iconAlt="password"
            />
            <Button className="mt-4 bg-primary mx-auto lg:mx-0 w-full">
              Login
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
          Don&apos;t have an account?
          <Link to="/login" className="font-semibold underline">
            Sign In
          </Link>
        </p>
      </div>
    </Container>
  );
};
export default RegisterForm;
