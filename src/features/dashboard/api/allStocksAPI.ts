import { apiClient } from "../../../services/apiClient";

export const allStocksAPI = {
  getAllStocks: (page = 1, limit = 5) =>
    apiClient.get("/users/all-stocks", {
      params: { page, limit },
    }),
};
