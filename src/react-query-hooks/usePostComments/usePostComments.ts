import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export function usePostComments() {
  
    return useQuery({queryKey: ['postComments'], queryFn: () => (
        axios.get(`${baseUrl}/postComments`, {
            withCredentials: true
        }).then(res => res.data.data.data)
    )       
    })
}


export function useMyPostComments() {
  
    return useQuery({queryKey: ['myPostComments'], queryFn: () => (
        axios.get(`${baseUrl}/users/getMyPostComments`, {
            withCredentials: true
        }).then(res => res.data.data.data)
    )       
    })
}
