import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { BackendRoutes } from '../../types';

export default function usePatchCreation(route: BackendRoutes, parentId: string) {
    return useMutation({
        mutationFn: (values: any) =>
        axios.patch(`${baseUrl}/${route}/${parentId}`, values, {
          withCredentials: true,
       
        })
    }
      
      // .then((res) => res.data)
    );
  }
  export function usePatchCreationSubscribers(route: BackendRoutes, parentId: string) {
    return useMutation({
        mutationFn: (values : {isSubscribed: boolean}) =>
        axios.patch(
          `${baseUrl}/${route}/${parentId}/update-subscribers`,
          values,
          {
            withCredentials: true,
        
          }
        )
    }
      

    );
  }