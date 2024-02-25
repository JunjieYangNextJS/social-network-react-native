import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { ChatMessage } from '../../../types';


export default function useGetChatMessages (chatRoomId: string, limit: number = 100) {
  
    return useQuery({queryKey: ['chatRoom', chatRoomId], queryFn: async () => 
    {
        const token = await getItemAsync("token");
        return axios.get(`${baseUrl}/chatMessages/${chatRoomId}?sort=-createdAt&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        
          }).then(res => res.data.data.data as ChatMessage[])
    }
        
          
    ,
        enabled: !!chatRoomId       
    })
}
