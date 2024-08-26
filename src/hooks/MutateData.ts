/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";
import { toast } from "sonner";

const useMutateData = (path: string, requestData: any) => {
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();
  const key = path.split("/")[1];
  console.log(key);
  const { mutate, data, isError, isSuccess, error, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(path, requestData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries(key);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    },
  });

  return { mutate, data, isError, isSuccess, error, isPending };
};

export default useMutateData;
