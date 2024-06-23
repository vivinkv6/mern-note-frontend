import { useMutation } from "@tanstack/react-query";
import { instance } from "../base/interceptor";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FieldValues } from "react-hook-form";
import { AxiosError } from "axios";


export const useForms=(url:string,name:string)=>{
  const setToken=useAuthStore.getState().setToken
const navigation=useNavigate()
   return useMutation({
        mutationKey: [name],
        mutationFn: async (data: FieldValues) => {
          const res = await instance
            .post(url, data)
            .then((res) => {
              if (res.data?.token) {
                Cookies.set("token", res.data?.token, {
                  expires: 1000 * 60 * 60 * 24 * 2,
                  secure: true,
                });
                setToken(data.data?.token);
                navigation("/dashboard");
              } else {
                data.data.message;
              }
            })
            .catch((err:AxiosError) =>{
                  return err.response?.data        
              });
          return res;
        },
      });
}