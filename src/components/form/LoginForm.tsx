"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CustomFormField from "../CustomFormField";
import { LoginFormValidation } from "@/lib/validation";
import Container from "@/layout/Container/Container";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "text_area",
  PHONE_INPUT = "phone_input",
  SELECT = "select",
}
const LoginForm = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
    toast.success("Login Successful");
    console.log(values);
  };
  return (
    <Container className="flex justify-center items-center h-screen">
      <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold text-center">Hey There👋</h1>
        <h1 className="text-xl font-semibold text-center">Welcome Back</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-6 flex-1", className)}
          >
            <CustomFormField
              control={form.control}
              className="placeholder:text-lg"
              fieldType={FormFieldType.INPUT}
              name="email"
              placeholder="Enter Your Email"
              iconAlt="user"
            />
            <CustomFormField
              control={form.control}
              className="placeholder:text-lg"
              fieldType={FormFieldType.INPUT}
              name="password"
              placeholder="Enter Your Password"
              iconAlt="user"
            />
            <Button className="mt-4 bg-primary mx-auto lg:mx-0 w-full">
              Login
            </Button>
          </form>
          <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
            Don&apos;t have an account?
            <Link to="/register" className="font-semibold underline">
              Register
            </Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};
export default LoginForm;
