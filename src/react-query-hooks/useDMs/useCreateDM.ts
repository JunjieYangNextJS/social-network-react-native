import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import baseUrl from "../../utils/baseUrl";

export default function useCreateDM() {
  return useMutation({
    mutationFn: (values) =>
    axios
      .post(
        `${baseUrl}/DM`,

        values,
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data.data.data)
  }
  );
}
