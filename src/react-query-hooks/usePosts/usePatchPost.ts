import axios from 'axios';
import { useMutation,  useQueryClient } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { About, ExposedTo, Post } from '../../../types';
import useToastStore from '../../store/useToastStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/RootStackNavigator';

export default function usePatchPost(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  (values: any) =>
    axios
      .patch(`${baseUrl}/posts/${postId}`, values, {
        withCredentials: true,
        
      })
      .then(res => res.data.data),
    onSuccess: data => {
        queryClient.setQueryData(['post', postId], data);
      }
  },
    
  );
}

export  function useUpdateDraftPost(postId: string | undefined) {
  const queryClient = useQueryClient();
  const {onOpenToast} = useToastStore()

  return useMutation({
    mutationFn: async (values: {
      content: string,
      title: string,
      about: About,
      exposedTo: ExposedTo,
      willNotify: boolean,
      createdAt: number,
      lastCommentedAt: number,
     
    }) => {
      const token = await getItemAsync("token");

      return axios
      .patch(`${baseUrl}/posts/${postId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      })
      .then(res => res.data.data as Post)

    },
    
    onSuccess: (data) => {
        onOpenToast("success", "Your draft has been updated!")
        queryClient.setQueryData(['draftPost', postId], data)
        queryClient.invalidateQueries({queryKey: ['draftPosts']});
      }
  },
    
  );
}

export function usePatchDraftToPost(postId: string, navigation: NativeStackNavigationProp<RootStackParamList, "PostDraft", undefined>) {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: any) => {
      const token = await getItemAsync("token");

      return axios.patch(`${baseUrl}/posts/${postId}/update-draftToPost`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      }).then(res => res.data.data as Post) 
    },
    onSuccess: (data) => {
      navigation.replace("Post", {
        postId: data._id
      })
    }
    
  }
  );
}

export function usePatchPostVotes(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: {post: string, removeId: string, addId?: string}) => {
      const token = await getItemAsync("token");

      return axios
      .patch(`${baseUrl}/posts/update-postVotes`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.data.data)
    }
    ,
      
    onSuccess: data => {
          queryClient.setQueryData(['post', postId], data);
        }
      

      
  },
  
    
  
    // {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(["post", postId]);
    //   },
    // }
  );
}
