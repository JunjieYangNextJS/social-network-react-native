import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { getItemAsync } from "expo-secure-store";

interface IValues {
  chatRoom: string;
  sender: string;
  receiverId: string;
  content: string;
}

export default function useCreateMessage() {
  return useMutation({
    mutationFn: async (values: IValues) => {
      const token = await getItemAsync("token");

      return axios.post(`${baseUrl}/chatMessages`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
}
