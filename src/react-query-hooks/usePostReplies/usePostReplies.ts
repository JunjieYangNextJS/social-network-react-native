import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export function usePostReplies() {
  
    return useQuery({queryKey: ['postReplies'], queryFn: () => (
        axios.get(`${baseUrl}/postReplies`, {
            withCredentials: true
        }).then(res => res.data.data.data)
    )       
    })
}