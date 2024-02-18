import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { Notification, User } from '../../../types';
import { getItemAsync } from 'expo-secure-store';




  export default function usePatchUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn:values =>
        axios
          .patch(`${baseUrl}/users/updateMe`, values, {
            withCredentials: true,
    
          })
          .then(res => res.data),

      onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user'], exact: true});
        }
    },
    );
  };

  export function usePatchUserWithoutPhoto() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (values: {
        profileName: string;
        location: string;
        gender: string;
        sexuality: string;
        twitter: string;
        bio: string;
    }) => {
        const token = await getItemAsync('token')
        return axios
        .patch(`${baseUrl}/users/updateMeWithoutPhoto`, values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
  
        })
        .then(res => res.data)
      }
        ,

      onSuccess: (_, variables) => {
            // queryClient.invalidateQueries({queryKey: ['user'], exact: true});
            queryClient.setQueryData(['user'], (prev: User) => ({...prev, ...variables}));
            
        }
    },
    );
  }

  // export function usePatchUserWithFormData() {
  //   const queryClient = useQueryClient();
  //   return useMutation({
  //     mutationFn:values =>
  //       axios
  //         .patch(`${baseUrl}/users/updateMe`, values, {
  //           withCredentials: true,
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //             acl: 'public-read'
  //           }
  //         })
  //         .then(res => res.data),

  //     onSuccess: () => {
  //           queryClient.invalidateQueries({queryKey: ['user'], exact: true});
  //       }
  //   },
  //   );
  // }


  export function usePatchArrayMethod(method: string, keepOg?: any) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (item: any) => {
        const token = await getItemAsync("token");
        return axios
          .patch(`${baseUrl}/users/${method}`, {item}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
    
          })
          .then(res => res.data)
      },
        

      onSuccess: () => {
           !keepOg && queryClient.invalidateQueries({queryKey: ['user'], exact: true});
        }
    },
    );
  }

  export function useAcceptFriendRequest() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async(values: {otherUserId: string, notificationId: string}) => {
        const token = await getItemAsync("token");

        return axios
        .patch(`${baseUrl}/users/${values.otherUserId}/acceptFriendRequest`, {notificationId: values.notificationId}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
  
        })
        .then(res => res.data)
      },

      onSuccess: (data, {notificationId}) => {
        queryClient.setQueryData(["notifications"], (prev: Notification[]) => prev.filter((noti) => noti._id !== notificationId));
        queryClient.invalidateQueries({queryKey: ['user'], exact: true});
        }
    },
    );
  }

  export function useRemoveFriend(otherUserUsername: string, otherUserId: string) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async () => {
        const token = await getItemAsync("token");
        return axios
        .patch(
          `${baseUrl}/users/${otherUserId}/removeFriend`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => res.data)
      }
      
    
      ,
      
        onSuccess: data => {
          // queryClient.invalidateQueries({queryKey: ['user'], exact: true});
          queryClient.setQueryData(['user'], (prev: User) => {
            return {
              ...prev,
              friendList: prev.friendList.filter((friend) => friend._id !== otherUserId)
            }})
  
          queryClient.invalidateQueries({queryKey: ['user', otherUserUsername], exact: true});
        }
    }
    );
  }
  

  export function useRemoveUserFriendRequest() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (values: {otherUserId: string, notificationId: string}) => {
        const token = await getItemAsync("token");
        
        return axios
        .patch(`${baseUrl}/users/removeFriendRequest`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
  
        })
        .then(res => res.data)
      },

      onSuccess: (data, {notificationId}) => {
        queryClient.setQueryData(["notifications"], (prev: Notification[]) => prev.filter((noti) => noti._id !== notificationId));
          queryClient.invalidateQueries({queryKey: ['user'], exact: true});
          
         
        }
      
    },
    );
  }