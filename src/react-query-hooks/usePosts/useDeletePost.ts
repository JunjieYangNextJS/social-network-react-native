import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';

export default function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const token = await getItemAsync("token");
      return axios.delete(`${baseUrl}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data)
    }
      
  }
    // (postId: string) =>
    //   axios
    //     .delete(`${backendApi}posts/${postId}`, {
    //       withCredentials: true,
    //       credentials: "include",
    //     })
    //     .then((res) => res.data),
    // {
    //   onError: () => {
    //     showError("Something went wrong");
    //   },
    //   onSuccess: () => {
    //     showSuccess("Your post was successfully deleted.");
    //   },
    // }

//     const queryClient = useQueryClient();
//     return useMutation({
//       mutationFn: (values: { username: string; password: string; }) =>
//         axios
//           .post(`${baseUrl}/users/login`, values, {
//             withCredentials: true,
            
         
//           })
//           .then((res) => (res.data) ),
  
      
//         onSuccess: async data => {
//           queryClient.setQueryData(['user'], data.data.user);
//           await SecureStore.setItemAsync('token', data.token)
        
//         }
      
// });
  );
}