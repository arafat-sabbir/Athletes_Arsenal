import axios from "axios";

const instance = axios.create({
  baseURL: "https://athletes-arsenal-server.vercel.app/api/v1",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
