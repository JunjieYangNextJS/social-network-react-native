import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { PostComment } from '../../../types';

export default function useGetPostComment(id: string) {
  
    return useQuery({queryKey: ['postComment', id], queryFn: () => (
        axios.get(`${baseUrl}/postComments/${id}`).then(res => res.data.data.data as PostComment)
          
    ),
        enabled: !!id       
    })
}

export  function useGetPinnedPostComment(id: string) {
  
    return useQuery({queryKey: ['pinnedPostComment', id], queryFn: () => (
        axios.get(`${baseUrl}/postComments/${id}`).then(res => res.data.data.data as PostComment)
          
    ),
        enabled: !!id       
    })
}