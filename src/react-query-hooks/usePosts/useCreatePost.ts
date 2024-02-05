import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { About, ExposedTo, Post } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import useToastStore from '../../store/useToastStore';

interface IValues {
  content: string,
  title: string,
  about: About,
  exposedTo: ExposedTo,
  willNotify: boolean,
  createdAt: number,
  lastCommentedAt: number,
  poll?: Record<'label', string>[],
  pollEndsAt?: number,
  draft?: boolean
}

export default function useCreatePost() {

  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "PostCreate",
    undefined
  >;
    const queryClient = useQueryClient()
  const {onOpenToast} = useToastStore()

  return useMutation({
    mutationFn: async (values: IValues) => {
      const token = await getItemAsync("token");

      return axios.post(`${baseUrl}/posts`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data.data.data as Post)
    },
    onSuccess: ((data, variables) => {
      if (variables.draft) {
        queryClient.setQueryData(['draftPosts'], (prev: Post[]) => [...prev, data])
        onOpenToast("success", "Your draft is saved!")
        
      } else {
        navigation.replace("Post", {
          postId: data._id,
        });
      }
      
    })
  }
  )} 