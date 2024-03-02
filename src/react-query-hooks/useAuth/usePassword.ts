import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { User } from '../../../types';

export function useForgotPassword() {
    return useMutation({
        mutationFn: async (values: { email: string }) => {
          const token = await getItemAsync("token");
          return  axios
          .post(`${baseUrl}/users/forgotPassword`, values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          
          }).catch(err => {
           
            return Promise.reject(err.response.data.error.message)
          })
        }
       
    
    }
    );
  }
  
  export function useResetPassword(token: string) {
    return useMutation({
        mutationFn: values =>
        axios
          .patch(`${baseUrl}/users/resetPassword/${token}`, values)
          .then(res => res.data)
    }
        
      );
    }
  
  
  export function useChangePassword() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (values: {password: string; passwordConfirm: string; passwordCurrent: string}) => {
          const token = await getItemAsync("token");
          return axios
          .patch(`${baseUrl}/users/updateMyPassword`, values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => res.data);
          
        },
        onSuccess: async data => {
          queryClient.setQueryData(['user'], data.data.user);
          await setItemAsync('token', data.token)
          
        
        }
        
        //   .catch(err => {
        //     showError(
        //       err.response.data.error.message ||
        //         'Your request was unsuccessful, please try again or later'
        //     );
        //     // if (err.response.status === 401) {
        //     //   console.log(err.response);
        //     //   showError('Your current password is invalid');
        //     // } else {
        //     //   showError('Changing password was unsuccessful');
        //     // }
        //   })
          
    }
    );
  }