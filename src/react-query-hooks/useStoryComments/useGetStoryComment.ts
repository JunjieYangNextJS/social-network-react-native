import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useGetStoryComment (id: string) {
  
    return useQuery({queryKey: ['pinnedStoryComment', id], queryFn:  () => (
        axios.get(`${baseUrl}/storyComments/${id}`).then(res => res.data.data.data)
          
    ),
        enabled: !!id      
    })
}
