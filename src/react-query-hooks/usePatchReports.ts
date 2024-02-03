import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { BackendRoutes } from '../../types';

export default function usePatchReports(id: string, route: BackendRoutes) {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) =>
    axios.patch(`${baseUrl}/${route}/${id}/update-reports`, values, {
      withCredentials: true,

    }),
  }
    
    
  );
}