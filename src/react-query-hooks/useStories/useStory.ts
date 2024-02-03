import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useStory(storyId: string) {
  
    return useQuery({queryKey: ['story', storyId], queryFn: () => (
        axios.get(`${baseUrl}/posts`, {
            withCredentials: true,
        
          }).then(res => res.data.data.data)
          
    ),
        enabled: !!storyId      
    })
}
