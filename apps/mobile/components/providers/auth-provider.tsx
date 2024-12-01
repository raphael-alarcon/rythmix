import { InferResponseType } from "@tuyau/client";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tuyau } from "@/constants/tuyau";
import { router } from "expo-router";

export type MeResponse = InferResponseType<typeof tuyau.auth.me.$get>;

type LoginPayload = {
  email: string;
  password: string;
};

export interface AuthStore {
  user: MeResponse | null;
  token: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  me: () => Promise<MeResponse>;
  setToken: (token: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,

  login: async (payload) => {
    const response = await tuyau.auth.login.$post(payload).unwrap();
    if (!response.token) return;
    get().setToken(response.token);
  },

  logout: async () => {
    await tuyau.auth.logout.$post().unwrap();
    set(() => ({ user: null, token: null }));
    await AsyncStorage.removeItem("token");
    router.push("/register");
  },

  me: async () => {
    const user = await tuyau.auth.me.$get().unwrap();
    set(() => ({ user: user }));
    return user;
  },

  setToken: async (token) => {
    set(() => ({ token }));
    await AsyncStorage.setItem("token", token);
    await get().me();
  },
}));

export default useAuthStore;
