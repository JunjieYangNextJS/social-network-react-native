import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useCreateStory() {


  return useMutation({
    mutationFn: (values) =>
      axios.post(`${baseUrl}/stories`, values, {
        withCredentials: true
      }).then((res) => res.data.data.data)
  }
  )} 