import { create } from "zustand";
import Cookies from "js-cookie";

type Auth = {
  token: string | null;
  getToken: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<Auth>((set) => ({
  token: "",
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
}));

export default useAuthStore;
