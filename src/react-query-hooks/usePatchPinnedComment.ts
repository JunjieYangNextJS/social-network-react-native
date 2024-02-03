import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { BackendRoutes } from '../../types';

export default function usePatchPinnedComment(route: BackendRoutes, id: string) {
  return useMutation({
    mutationFn: values =>
    axios.patch(`${baseUrl}/${route}/${id}/update-pinnedComment`, values, {
      withCredentials: true
    })
  }
  );
}
