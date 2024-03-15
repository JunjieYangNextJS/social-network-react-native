import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import * as SecureStore from 'expo-secure-store';
import useUserTokenStore from '../../store/useUserTokenStore';

export type signUpValuesType = {
    username: string;
    profileName: string;
    password: string;
    passwordConfirm: string;
    email: string;
    birthMonth?: number;
    birthYear?: number;
    birthDay?: number;
    modelName: string | null;
    createdThrough: string | null;
  };

export default function useSignUp() {
    const queryClient = useQueryClient();
    const {setAuthenticated} = useUserTokenStore();
    return useMutation({
      mutationFn: ((values: signUpValuesType) => axios
      .post(`${baseUrl}/users/signUp`, values, {     
      })
      .catch(err => {
        console.log(err)
        return Promise.reject(err.response.data.error.message)
      })
      .then((res) => (res.data))),

      onSuccess: async data => {
       
        queryClient.setQueryData(['user'], data.data.user);
        await SecureStore.setItemAsync('token', data.token)
        setAuthenticated()
      
      }
    })
  }

