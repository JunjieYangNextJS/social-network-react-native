import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { BlockedUser } from '../../../types';

export default function useGetBlockedUsers() {
    return useQuery({
        queryKey: ['blockedUsers'],
        queryFn: async () => {
          const token = await getItemAsync('token');
          return axios
            .get(`${baseUrl}/users/getBlockedUsers`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
        
            })
            .then(res => res.data.data.data as BlockedUser[])
        }
        
    }
    
    );
  }