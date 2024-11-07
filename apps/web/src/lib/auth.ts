import { tuyau } from "./constants";

export const getUser = async () => {
  return await tuyau.auth.me.$get().unwrap();
};
