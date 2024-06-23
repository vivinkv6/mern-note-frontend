import { useQuery } from "@tanstack/react-query";
import { instance } from "../base/interceptor";

export const useFetch = (url: string, name: string) => {
  return useQuery({
    queryKey: [name],
    queryFn: () => {
      return instance
        .get(url)
        .then((res) => {
          console.log(res);

          if (res.status == 200) return res.data;
        })
        .catch((err: Error) => {
          console.log(err.message);
          err.message;
        });
    },
  });
};
