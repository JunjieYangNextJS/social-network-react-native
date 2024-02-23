import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';

interface IValues {
  passwordCurrent: string;
  emailCurrent?: string;
  email?: string;
  username?: string;
}

export function useChangeEmailOrUsername(type: "username" | "email") {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: IValues) => {
          const token = await getItemAsync("token");
          return  axios
          .patch(`${baseUrl}/users/updateEmailOrUsername`, values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
          .then(res => res.data.data)
        }
       ,
  
      
        onSuccess: data => {
          queryClient.setQueryData(['user'], data);
        }
      
    }
      
    );
  }