import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import * as SecureStore from 'expo-secure-store';
import useUserTokenStore from '../../store/useUserTokenStore';

export function useLogin() {
    const queryClient = useQueryClient();
    const {setAuthenticated} = useUserTokenStore();
    return useMutation({
      mutationFn: (values: { username: string; password: string; }) =>
        axios
          .post(`${baseUrl}/users/login`, values)
          .catch(err => {
           
            return Promise.reject(err.response.data.error.message)
          })
          .then((res) => (res.data) ),
  
      
        onSuccess: async data => {
          queryClient.setQueryData(['user'], data.data.user);
          await SecureStore.setItemAsync('token', data.token)
          setAuthenticated()
          // if (handleNavigation) handleNavigation()
        
        }
      
});
  };

export function useGuestLogin() {
    const queryClient = useQueryClient();
    const {setAuthenticated} = useUserTokenStore();
    return useMutation({
      mutationFn: () =>
        axios
          .post(`${baseUrl}/users/guestLogin`, {})
          .catch(err => {
           
            return Promise.reject(err.response.data.error.message)
          })
          .then((res) => (res.data) ),
  
      
        onSuccess: async data => {
          queryClient.setQueryData(['user'], data.data.user);
          await SecureStore.setItemAsync('token', data.token)
          setAuthenticated()
          // if (handleNavigation) handleNavigation()
        
        }
      
});
  }

