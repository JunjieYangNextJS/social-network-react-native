import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { Post } from '../../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/RootStackNavigator';

type Navigation =
      | NativeStackNavigationProp<RootStackParamList, "PostCreate", undefined>
      | NativeStackNavigationProp<RootStackParamList, "PostDraft", undefined>;
  
 
  

export default function useDeleteDraftPost(navigation: Navigation, onCloseDrafts: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: {postId: string, currentScreenPostId: string | undefined}) => {
      const token = await getItemAsync("token");
      return axios.delete(`${baseUrl}/posts/${values.postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data)
    },
    onSuccess: (data, {postId, currentScreenPostId}) => {
        queryClient.setQueryData(['draftPosts'], (prev: Post[]) => {
            return prev.filter((post) => post._id !== postId)
        }
        )
        if (postId === currentScreenPostId) {
            onCloseDrafts();
            navigation.navigate("Posts")
        }
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