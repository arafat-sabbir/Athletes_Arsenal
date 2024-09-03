import { logOut, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://athletes-arsenal-server.vercel.app/api/v1",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const navigate = useNavigate();

  instance.interceptors.request.use(
    (config) => {
      config.headers.authorization = `bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      // Check if error.response exists
      const status = error.response ? error.response.status : null;
      if (status === 401 || status === 403) {
        dispatch(logOut());
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosSecure;
