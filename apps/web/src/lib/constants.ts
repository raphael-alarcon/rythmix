import { createTuyau } from "@tuyau/client";
import { api } from "@rythmix/backend/api";

export const tuyau = createTuyau({
  api,
  baseUrl: "http://localhost:3333",
  credentials: "include",
});
