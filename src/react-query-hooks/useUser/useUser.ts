import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import {getItemAsync} from 'expo-secure-store';
import { User } from '../../../types';

export default function useUser() {

    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
          const token = await getItemAsync('token')

          return axios
          .get(`${baseUrl}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
 
          })
          .then(res => res.data.data.data as User)
        },
        

        
       
    })
  }

export function useGetMyFollowingPeople() {
    return useQuery({
        queryKey: ['myFollowingPeople'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getMyFollowingPeople`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data)
    })
  }