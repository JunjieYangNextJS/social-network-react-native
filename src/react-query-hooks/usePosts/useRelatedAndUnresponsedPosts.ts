import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { About } from '../../../types';

export function useRelatedAndUnresponsedPosts (postId: string, about: About) {
  
    return useQuery({queryKey: ['relatedAndUnresponsedPosts', postId], queryFn: async () => (
        axios.get(`${baseUrl}/relatedAndUnresponsedPosts/${postId}/${about}`).then(res => res.data.data.data)
          
    )       
    })
}