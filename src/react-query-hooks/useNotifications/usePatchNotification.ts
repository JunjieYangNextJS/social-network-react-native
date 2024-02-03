import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';

export default function usePatchNotification() {

  return useMutation({
    mutationFn: (id) =>
        axios
        .patch(`${baseUrl}/notifications/${id}`, {}, {
            withCredentials: true,
    
        })
     
  
  }
    
  );
}