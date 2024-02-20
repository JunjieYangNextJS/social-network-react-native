import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';

export function useGetLikedPosts() {
    return useQuery({
        queryKey: ['likedPosts'],
        queryFn: async () => {
          const token = await getItemAsync('token');
          return axios
          .get(`${baseUrl}/users/getLikedPosts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
 
          })
          .then(res => res.data.data.data)
        }
        
    }
         
    );
  }
  export function useGetLikedStories() {
    return useQuery({
        queryKey: ['likedStories'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getLikedStories`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
    }
         
    );
  }
  export function useGetLikedSecrets() {
    return useQuery({
        queryKey: ['likedSecrets'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getLikedSecrets`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
    })
  }