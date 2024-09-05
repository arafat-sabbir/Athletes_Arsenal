/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";
import { toast } from "sonner";

const useMutateData = (
  path: string,
  requestData: any,
  invalidateQueries?: string[]
) => {
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();
  const { mutate, data, isError, isSuccess, error, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(path, requestData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries(invalidateQueries as any);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    },
  });

  return { mutate, data, isError, isSuccess, error, isPending };
};

export default useMutateData;
