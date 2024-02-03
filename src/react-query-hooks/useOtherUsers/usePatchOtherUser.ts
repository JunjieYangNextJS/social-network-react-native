import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseUrl from '../../utils/baseUrl';
import { User } from '../../../types';



export default function usePatchOtherUser(
  otherUserUsername: string,
  otherUserId: string,
  keep: string | number | boolean
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  values =>
    axios
      .patch(`${baseUrl}/users/${otherUserId}/updateOtherUser`, values, {
        withCredentials: true,
 
      })
      .then(res => res.data),

    // onError: () => {
    //     showError('Something went wrong');
    //   },
    onSuccess: data => {
        queryClient.invalidateQueries({queryKey: ['user', otherUserUsername]});
        !keep && queryClient.invalidateQueries({queryKey:['user']});
      }
  }
   

      
    
  );
}

export function usePatchOtherUserFriendRequest(
  otherUserUsername: string,
  method: string,
  otherUserId: string,
  keep: string | number | boolean
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: friendRequest =>
        axios.patch(
        `${baseUrl}/users/${otherUserId}/${method}`,
        friendRequest,
        {
            withCredentials: true,
    
        }
        ),

    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['user', otherUserUsername]});

        !keep && queryClient.invalidateQueries({queryKey:['user']});
      }
  }
    
    // .then((res) => res.data),
    
      
    
  );
}

export function useFollowOtherUser(
  otherUserId: string,
  otherUserUsername: string,
  otherUserFollowers: string[],
  myId: string
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
    axios
      .patch(
        `${baseUrl}/users/${otherUserId}/followOtherUser`,
        {},
        {
          withCredentials: true,
    
        }
      )
      .then(res => res.data.data),

    onMutate: async () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({queryKey: ['user', otherUserUsername]});

        // // Snapshot the previous value
        const previousOtherUser = queryClient.getQueryData([
          'user',
          otherUserUsername
        ]);

        if (!previousOtherUser) throw new Error("The other user's info is found!")

        // // Optimistically update to the new value
        queryClient.setQueryData(['user', otherUserUsername], {
          ...previousOtherUser,
          followers: [...otherUserFollowers, myId]
        });

        // // Return a context with the previous and new todo
        return { previousOtherUser };
      },
    onError: (_err, _newTodo, context) => {
        if (!context?.previousOtherUser) return;

        queryClient.setQueryData(
          ['user', otherUserUsername],
          context.previousOtherUser
        );
      },
    onSettled: data => {
        // queryClient.invalidateQueries(["user", otherUserUsername]);
        if(otherUserUsername && data)
        queryClient.setQueryData(['user', otherUserUsername], data);
      }
  }
    
    
      
    
  );
}

export function useUnfollowOtherUser(
  otherUserId: string,
  otherUserUsername: string,
  otherUserFollowers: string[],
  myId: string
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
        axios
        .patch(
            `${baseUrl}/users/${otherUserId}/unfollowOtherUser`,
            {},
            {
            withCredentials: true,
        
            }
        )
        .then(res => res.data.data),

    onMutate: async () => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({queryKey: ['user', otherUserUsername]});
    
            // // Snapshot the previous value
            const previousOtherUser = queryClient.getQueryData([
              'user',
              otherUserUsername
            ]);
    
            if (!previousOtherUser) throw new Error("The other user's info is found!")

            // // Optimistically update to the new value
            queryClient.setQueryData(['user', otherUserUsername], {
              ...previousOtherUser,
              followers: otherUserFollowers.filter(id => id !== myId)
            });
    
            // // Return a context with the previous and new todo
            return { previousOtherUser };
          },
    onError: (_err, _newTodo, context) => {
        if (!context?.previousOtherUser) return;

            queryClient.setQueryData(
              ['user', otherUserUsername],
              context.previousOtherUser
            );
          },
    onSettled: data => {
            // queryClient.invalidateQueries(["user", otherUserUsername]);
            if(otherUserFollowers && data)
            queryClient.setQueryData(['user', otherUserUsername], data);
          }
  }
    
 
  );
}
