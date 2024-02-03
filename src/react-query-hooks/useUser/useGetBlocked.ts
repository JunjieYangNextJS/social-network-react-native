import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useGetBlockedUsers() {
    return useQuery({
        queryKey: ['blockedUsers'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getBlockedUsers`, {
            withCredentials: true,
      
          })
          .then(res => res.data.data.data)
    }
    
    );
  }