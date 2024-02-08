import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { OtherUser } from '../../../types';

export default function useOtherUser(username: string) {
  return useQuery({
    queryKey:  ['user', username],
    queryFn: async () => {
      const token = await getItemAsync("token");
      return axios
      .get(`${baseUrl}/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // credentials: "include",
      })
      .catch(err => {
        // console.log(err.response.status)
        // if (err.response.status === 403)
        //   setErrorMessage('Ouch, You have been forbidden to view this page');
        // if (err.response.status === 404) setErrorMessage(404);
        // if (err.response.status === 302) setErrorMessage(302);
        return Promise.reject(err.response.data.error.message)
      })
      .then(res => res.data.data.data as OtherUser)
      
    }
    
  } 
  );
}

export function useGetHoverOtherUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId, 'hover'],
    queryFn: () =>
        axios
        .get(`${baseUrl}/users/getHover/${userId}`)
        .then(res => res.data.data),
    enabled: Boolean(userId) 
  }

    
  );
}

export function useGetPopularPeople() {
  return useQuery({
    queryKey: ['popularPeople'],
    queryFn: () =>
    axios
      .get(`${baseUrl}/users/getPopularPeople`, {
        withCredentials: true
      })
      .then(res => res.data.data)
  } 
  );
}

export function useGetLikeMindedPeople(userId: string) {
  return useQuery({
    queryKey: ['likeMindedPeople'],
    queryFn: () =>
    axios
      .get(`${baseUrl}/users/getLikeMindedPeople`, {
        withCredentials: true
      })
      .then(res => res.data.data),

      enabled: !!userId 
  }
    
    
    
  );
}

export function useGetFollowers(username: string) {
  return useQuery({
    queryKey: [username, 'followers'],
    queryFn:() =>
    axios
      .get(`${baseUrl}/users/getOtherUserFollowers/${username}`)
      .then(res => res.data.data),
       enabled: !!username 
  }
    
    
    
  );
}

export function useGetFollowing(username: string) {
  return useQuery({
    queryKey: [username, 'following'],
    queryFn: () =>
    axios
      .get(`${baseUrl}/users/getOtherUserFollowing/${username}`)
      .then(res => res.data.data),
   enabled: !!username 
  }
    
    
  );
}

export function useOtherUserLikeMinded(username: string, gender: string, sexuality: string) {
  return useQuery({
    queryKey: [username, 'similar people'],
    queryFn: () =>
    axios
      .get(
        `${baseUrl}users/getOtherUserLikeMinded/${gender}/${sexuality}`,
        {
          withCredentials: true
          // credentials: "include",
        }
      )
      .then(res => res.data.data),
       enabled: !!username 
  }
    
    
    
  );
}
