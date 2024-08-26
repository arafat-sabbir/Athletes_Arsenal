/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";
import { toast } from "sonner";

const useMutateData = (path: string, requestData: any) => {
  const axios = useAxiosSecure();

  const { mutate, data, isError, isSuccess, error,isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(path, requestData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to perform the operation");
    },
  });

  return { mutate, data, isError, isSuccess, error,isPending };
};

export default useMutateData;
