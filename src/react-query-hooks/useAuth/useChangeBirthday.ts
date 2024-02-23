import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';


export function useChangeBirthday() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: {birthDay?: number; birthMonth?: number; birthYear?: number}) => {
          const token = await getItemAsync("token");
          return axios
            .patch(`${baseUrl}/users/updateBirthday`, values, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
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