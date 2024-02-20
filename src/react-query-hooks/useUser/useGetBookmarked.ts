import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { Post, PostComment } from '../../../types';

export function useGetBookmarkedPosts() {
    return useQuery({
        queryKey: ['bookmarkedPosts'],
        queryFn: async () => {
          const token = await getItemAsync('token');
          return axios
          .get(`${baseUrl}/users/getBookmarkedPosts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
 
          })
          .then(res => res.data.data.data as Post[])
        }
        
    }
         
    );
  }

export function useGetBookmarkedPostComments() {
    return useQuery({
        queryKey: ['bookmarkedPostComments'],
        queryFn: async () => {
          const token = await getItemAsync('token');
          return axios
          .get(`${baseUrl}/users/getBookmarkedPostComments`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
 
          })
          .then(res => res.data.data as PostComment[])
        }
        
    }
         
    );
  }

  export function useGetBookmarkedStories() {
    return useQuery({
        queryKey: ['bookmarkedStories'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getBookmarkedStories`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
    }
         
    );
  }
  export function useGetBookmarkedSecrets() {
    return useQuery({
        queryKey: ['bookmarkedSecrets'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getBookmarkedSecrets`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
    })
  }