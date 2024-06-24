import { create } from "zustand";
import Cookies from "js-cookie";

type Auth = {
  token: string | null;
  user: string;
  getToken: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
  getUser: () => void;
};

export const useAuthStore = create<Auth>((set) => ({
  token: "",
  user: "",
  getToken: () => {
    const cookieValue = Cookies?.get("token");
    if (cookieValue) {
      set(() => ({
        token: cookieValue,
      }));
    }
  },
  setToken: (token: string) => {
    set({ token });
    Cookies.set("token", token, {
      expires: 1000 * 60 * 24 * 2,
    });
  },

  clearToken: () => {
    set({ token: null });
    Cookies.remove("token");
  },
  getUser: () => {
    const cookieValue = Cookies?.get("user");
    if (cookieValue) {
      set(() => ({
        user: cookieValue,
      }));
    }
  },
}));

export default useAuthStore;
