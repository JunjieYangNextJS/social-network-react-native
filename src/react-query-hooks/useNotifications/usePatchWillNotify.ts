import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';

export default function usePatchWillNotifyNotifications() {
    const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values:  string[]) => {
      const token = await getItemAsync("token");
      return  axios
      .patch(`${baseUrl}/users/willNotifyNotifications`, {ids: values}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
  
      }).then(res => res.data.data.data)
    },

    onSuccess: () => {
        queryClient.setQueryData(["willNotifyNotifications"], 0)
    }
  }
    
  );
}