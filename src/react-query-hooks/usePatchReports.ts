import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { BackendRoutes } from '../../types';
import { getItemAsync } from 'expo-secure-store';

export default function usePatchReports(id: string, route: BackendRoutes) {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: {reportedFor: string}) => {
      const token = await getItemAsync('token')
      return axios.patch(`${baseUrl}/${route}/${id}/update-reports`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
  
      })
    },
   
  }
    
    
  );
}