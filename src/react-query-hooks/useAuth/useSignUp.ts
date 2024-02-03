import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import * as SecureStore from 'expo-secure-store';

export type signUpValuesType = {
    username: string;
    profileName: string;
    password: string;
    passwordConfirm: string;
    email: string;
    rememberMe: boolean;
    birthMonth: number;
    birthYear: number;
    birthDay: number;
  };

export function useSignUp() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ((values: any) => axios
      .post(`${baseUrl}/users/signUp`, values, {     
      })
      .then((res) => (res.data))),

      onSuccess: async data => {
        queryClient.setQueryData(['user'], data.data.user);
        await SecureStore.setItemAsync('token', data.token)
      
      }
    })
  }