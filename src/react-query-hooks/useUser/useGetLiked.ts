import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export function useGetLikedPosts() {
    return useQuery({
        queryKey: ['likedPosts'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getLikedPosts`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
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