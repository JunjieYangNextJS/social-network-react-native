import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { About } from '../../../types';

export function useRelatedAndUnresponsedStories (storyId: string, about: About) {
  
    return useQuery({queryKey: ['relatedAndUnresponsedStories', storyId], queryFn: () => (
        axios.get(`${baseUrl}/relatedAndUnresponsedStories/${storyId}/${about}`).then(res => res.data.data.data)
          
    )       
    })
}