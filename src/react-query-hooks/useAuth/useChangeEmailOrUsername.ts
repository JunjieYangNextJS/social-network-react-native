import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseUrl from '../../utils/baseUrl';

export function useChangeEmailOrUsername(type: "username" | "password") {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: values =>
        axios
          .patch(`${baseUrl}/users/updateEmailOrUsername`, values, {
            withCredentials: true
          })
          .catch(err => {
            // if (err.response.status === 401) {
            //   showError('Your current password is invalid');
            // } else if (err.response.status === 403) {
            //   showError(`This ${type} is not allowed`);
            // } else if (err.response.status === 400) {
            //   showError(`Your ${type} is taken.`);
            // } else {
            //   showError('Update was unsuccessful');
            // }
            return Promise.reject(err)
          })
          .then(res => res.data.data),
  
      
        onSuccess: data => {
          queryClient.setQueryData(['user'], data);
        }
      
    }
      
    );
  }