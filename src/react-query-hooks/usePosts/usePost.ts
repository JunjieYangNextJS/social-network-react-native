import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { Post } from '../../../types';

export default function usePost (postId: string) {
  
    return useQuery({queryKey: ['post', postId], queryFn: async () => 
    {
        const token = await getItemAsync("token");
        return axios.get(`${baseUrl}/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        
          }).catch(err => {
            // console.log(err.response.status)
            // if (err.response.status === 403)
            //   setErrorMessage('Ouch, You have been forbidden to view this page');
            // if (err.response.status === 404) setErrorMessage(404);
            // if (err.response.status === 302) setErrorMessage(302);
         
            return Promise.reject(err.response.data.error.message)
          }).then(res => res.data.data.data as Post)
    }
        
          
    ,
        enabled: !!postId       
    })
}
