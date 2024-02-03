import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';

export default function useGetWillNotifyNotifications() {
  return useQuery({
    queryKey: ['willNotifyNotifications'], 
    queryFn: async () => {
      const token = await getItemAsync("token");

      return axios
      .get(`${baseUrl}/users/willNotifyNotifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      })
      .then(res => res.data.data.unreadCount as number)
    }
       
});
}