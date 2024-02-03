import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseUrl from '../../utils/baseUrl';


export function useChangeBirthday() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: values =>
        axios
          .patch(`${baseUrl}/users/updateBirthday`, values, {
            withCredentials: true
          })
  
          .then(res => res.data.data),
      
        onSuccess: data => {
          queryClient.setQueryData(['user'], data);
        }
      
    }
      
    );
  }