import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';

export default function usePatchPostComment(postCommentId: string) {

  return useMutation({
    mutationFn:  values =>
    axios
      .patch(`${baseUrl}/postComments/${postCommentId}`, values, {
        withCredentials: true,
 
      })
      .then(res => res.data),
  
  }
    
  );
}