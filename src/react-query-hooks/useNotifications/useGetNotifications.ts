import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { Notification } from '../../../types';
import { getItemAsync } from 'expo-secure-store';


export default function useNotifications() {
  return useQuery({
    queryKey: ['notifications'], 
    queryFn: async () => {
        const token = await getItemAsync("token");

        return axios
        .get(`${baseUrl}/users/notifications`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },

        })
        .then(res => { return res.data.docs as Notification[]})
    }
        
});
}

