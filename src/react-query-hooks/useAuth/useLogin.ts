import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import * as SecureStore from 'expo-secure-store';

export function useLogin({handleNavigation}: {handleNavigation?: () => void}) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (values: { username: string; password: string; }) =>
        axios
          .post(`${baseUrl}/users/login`, values)
          .then((res) => (res.data) ),
  
      
        onSuccess: async data => {
          queryClient.setQueryData(['user'], data.data.user);
          await SecureStore.setItemAsync('token', data.token)
          if (handleNavigation) handleNavigation()
        
        }
      
});
  };

export function useGuestLogin({handleNavigation}: {handleNavigation?: () => void}) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        axios
          .post(`${baseUrl}/users/guestLogin`, {})
          .then((res) => (res.data) ),
  
      
        onSuccess: async data => {
          queryClient.setQueryData(['user'], data.data.user);
          await SecureStore.setItemAsync('token', data.token)
          if (handleNavigation) handleNavigation()
        
        }
      
});
  }

