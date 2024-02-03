import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { BackendRoutes } from '../../types';
import { getItemAsync } from 'expo-secure-store';

export default function useGetComment (route: BackendRoutes, creationId: string, creationLabel: string) {
  
    return useQuery({
        
        queryKey: [creationLabel, creationId], 
            
        queryFn: async () => {
            const token = await getItemAsync('token')

        return axios.get(`${baseUrl}/${route}/${creationId}`, {
            headers: {
                Authorization: `Bearer ${token}`
              }
        
          }).then(res => res.data.data.data)
        },
        
        retry: 3     
    })
}
