import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useDraftPosts () {
  
    return useQuery({queryKey: ['draftPosts'], queryFn: () => (
        axios.get(`${baseUrl}/posts/draft`, {
            withCredentials: true
        }).then(res => res.data.data.data)
    )       
    })
}
