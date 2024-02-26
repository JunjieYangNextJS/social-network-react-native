import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import useToastStore from '../../store/useToastStore';
import { User } from '../../../types';

export default function useCreateChatRoom() {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({otherUserId, userId}: {otherUserId: string, userId: string}) => {
      const token = await getItemAsync("token");

      return axios.post(`${baseUrl}/chatRooms`, {
        users: [{ user: otherUserId }, { user: userId }],
      }, {
        
        headers: {
          Authorization: `Bearer ${token}`,
        }
    }).then((res) => res.data.data.data)

    },

    onSuccess: (data) => {
     
      queryClient.setQueryData(['user'], (old: User) => {
        return { ...old, chatRooms: [data, ...old.chatRooms] };
      });
      }
  }
  )} 