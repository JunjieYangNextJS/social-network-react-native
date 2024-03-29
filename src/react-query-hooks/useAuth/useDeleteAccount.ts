import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';


export default function useDeleteAccount() {
  return useMutation({
    mutationFn: async (values: {password: string}) => {
      const token = await getItemAsync("token");
      return axios.patch(`${baseUrl}/users/deleteMyAccount`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data)
    },
   
      
  })}

export function useDeleteGuestAccount() {
  return useMutation({
    mutationFn: async () => {
      const token = await getItemAsync("token");
      return axios.delete(`${baseUrl}/users/deleteMyGuestAccount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data)
    },
   
      
  })}

