import { create } from "apisauce";

const apiClient = create({
  //baseURL: "https://greenjuiceshop-default-rtdb.firebaseio.com",
  //baseURL: "https://greenjuiceshop-dc87f-default-rtdb.firebaseio.com",
  baseURL: "https://greenjuiceshoptesting-default-rtdb.firebaseio.com",
});

export default apiClient;
