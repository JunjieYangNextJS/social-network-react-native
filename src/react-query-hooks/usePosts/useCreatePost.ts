import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { About, ExposedTo, Post } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/RootStackNavigator';

interface IValues {
  content: string,
  title: string,
  about: About,
  exposedTo: ExposedTo,
  willNotify: boolean,
  createdAt: number,
  lastCommentedAt: number,
  poll: Record<'label', string>[],
  pollEndsAt: number

}

export default function useCreatePost() {

  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "PostCreate",
    undefined
  >;

  return useMutation({
    mutationFn: async (values: IValues) => {
      const token = await getItemAsync("token");

      return axios.post(`${baseUrl}/posts`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data.data.data as Post)
    },
    onSuccess: ((data) => {
      navigation.replace("Post", {
              postId: data._id,
            });
    })
  }
  )} 