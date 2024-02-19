import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { Post, PostComment } from '../../../types';

export function useGetMyPosts() {
    return useQuery({
        queryKey: ['myPosts'],
        queryFn: async () => {
          const token = await getItemAsync('token')
          return axios
          .get(`${baseUrl}/users/getMyPosts`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
 
          })
          .then(res => res.data.data.data as Post[])
        }
        
    }
         
    );
  }
export function useGetMyPostComments() {
    return useQuery({
        queryKey: ['myPostComments'],
        queryFn: async () => {
          const token = await getItemAsync('token')
          return axios
          .get(`${baseUrl}/users/getMyPostComments`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
 
          })
          .then(res => res.data.data as PostComment[])
        }
        
    }
         
    );
  }
  export function useGetMyStories() {
    return useQuery({
        queryKey: ['myStories'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getMyStories`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
    }
         
    );
  }

  export function useGetMySecrets() {
    return useQuery({
        queryKey: ['mySecrets'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getMySecrets`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
    })
  }

  export function useGetMyComments() {
    return useQuery({
        queryKey: ['myComments'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getMyComments`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
    })
  }

