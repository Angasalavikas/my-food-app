
import type { RegisterRequest } from "../Interface/RegisterRequest";
import axiosInstance from "./AxiosConfig";

export const registerUser = async (data: RegisterRequest) => {
    return await axiosInstance.post("/auth/signup", data);
}; 