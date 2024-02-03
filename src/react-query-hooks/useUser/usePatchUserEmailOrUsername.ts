import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { User } from '../../../types';

interface patchEmailOrUsernameValues {
    passwordCurrent: string,
    email: string,
    username: string
  }
  
  export default function usePatchEmailOrUsername(user: User) {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (values: patchEmailOrUsernameValues) =>
        axios
          .patch(
            `${baseUrl}/users/updateEmailOrUsername`,
            {
              passwordCurrent: values.passwordCurrent,
              email: values.email || user.email,
              username: values.username || user.username
            },
            {
              withCredentials: true,
            
            }
          )
          .then(res => res.data),
  
        onSuccess: data => {
            queryClient.invalidateQueries({queryKey: ['user'], exact: true});
          }
      }
      );
    }