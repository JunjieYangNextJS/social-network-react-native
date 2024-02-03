import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseUrl from '../../utils/baseUrl';

export function useForgotPassword() {
    return useMutation({
        mutationFn: values =>
        axios
          .post(`${baseUrl}users/forgotPassword`, values, {
            withCredentials: true,
          
          })
    
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
    return useMutation({
        mutationFn: values =>
        axios
          .patch(`${baseUrl}/users/updateMyPassword`, values, {
            withCredentials: true
          })
          .then(res => res.data.data.user)
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