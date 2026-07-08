import { registerUser } from "../apis/AuthApis";
import type { RegisterRequest } from "../Interface/RegisterRequest";


export const servieRegister = async (data: RegisterRequest) => {
  const response = await registerUser(data);

  return response.data;
};