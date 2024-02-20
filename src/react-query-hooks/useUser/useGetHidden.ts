import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { Post } from '../../../types';
import { getItemAsync } from 'expo-secure-store';

export function useGetHiddenPosts() {
    return useQuery({
        queryKey: ['hiddenPosts'],
        queryFn: async () => {
          const token = await getItemAsync('token');
          return axios
            .get(`${baseUrl}/users/getHiddenPosts`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
    
            })
            .then(res => res.data.data.data as Post[])
        }
    } 
    );
  }
  export function useGetHiddenStories() {
    return useQuery({
        queryKey: ['hiddenStories'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getHiddenStories`, {
            withCredentials: true,

          })
          .then(res => res.data.data.data)
    } 
    );
  }
  export function useGetHiddenSecrets() {
    return useQuery({
        queryKey: ['hiddenSecrets'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getHiddenSecrets`, {
            withCredentials: true,
      
          })
          .then(res => res.data.data.data)
    } 
    );
  }