import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import {getItemAsync} from 'expo-secure-store';
import { User } from '../../../types';

export default function useSearchUsers(searchValue: string, enabled: boolean) {

    return useQuery({
        queryKey: ['users/searchQuery', {searchValue}],
        queryFn: async () => {
         

          return axios
          .get(`${baseUrl}/users/searchQuery/${searchValue}?sort=createdAt`, {
            
 
          })
          .then(res => res.data.data.data as User[])
        },
        enabled: ((!!searchValue) && (enabled))

        
       
    })
  }
