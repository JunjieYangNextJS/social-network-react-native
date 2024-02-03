import axios from "axios";
import { useMutation} from "@tanstack/react-query";

import baseUrl from "../../utils/baseUrl";

export default function useCreateNews() {
  return useMutation({
    mutationFn: (values) =>
    axios
      .post(`${baseUrl}/news`, values, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          acl: "public-read",
        },
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => res.data.data),
  }
    
   
  );
}