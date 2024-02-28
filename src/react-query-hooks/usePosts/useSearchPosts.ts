import {  useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

import {  Post} from '../../../types';

export function useSearchPosts (searchValue: string, enabled: boolean) {
  
    return useQuery({queryKey: ['posts/searchQuery', {searchValue}], queryFn: async () => {
        // const token = await getItemAsync("token");

        return axios.get(`${baseUrl}/posts/searchQuery/${searchValue}`, {
            
          }).then(res => res.data.data.data as Post[])
    },
       enabled: ((!!searchValue) && (enabled))
    }    
    )
}
