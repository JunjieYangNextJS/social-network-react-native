import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export function useGetHiddenPosts() {
    return useQuery({
        queryKey: ['hiddenPosts'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getHiddenPosts`, {
            withCredentials: true,
  
          })
          .then(res => res.data.data.data)
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