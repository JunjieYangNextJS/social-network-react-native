import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export function useGetMyPosts() {
    return useQuery({
        queryKey: ['myPosts'],
        queryFn: () =>
        axios
          .get(`${baseUrl}/users/getMyPosts`, {
            withCredentials: true,
 
          })
          .then(res => res.data.data.data)
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