import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export function useGetBookmarkedPosts() {
    return useQuery({
        queryKey: ['bookmarkedPosts'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getBookmarkedPosts`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
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