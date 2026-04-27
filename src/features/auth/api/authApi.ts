import { apiClient } from "../../../services/apiClient";

export interface LoginPayload {
  value: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post("/users/login", {
      email: payload.value,
      password: payload.password,
    }),

  signup: (payload: SignupPayload) => apiClient.post("/users/signup", payload),
};
