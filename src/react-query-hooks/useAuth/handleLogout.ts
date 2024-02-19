import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useQueryClient } from "@tanstack/react-query";
import useToastStore from "../../store/useToastStore";
import { getItemAsync, deleteItemAsync } from "expo-secure-store";
import useUserTokenStore from "../../store/useUserTokenStore";

const onLogout = async () => {
 
    const queryClient = useQueryClient();
    const {onOpenToast} = useToastStore();
    const {setAuthenticated} = useUserTokenStore();
    const token = await getItemAsync("token");
   
    try {
      console.log('?')
      const res = await axios.get(`${baseUrl}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if ((res.data.status = 'success')) {
        queryClient.removeQueries({queryKey:['user', { exact: true }]});
        await deleteItemAsync('token');
        setAuthenticated()
        onOpenToast('success','Logout was successful')
        
        
      }
    } catch (err) {
      onOpenToast('error','Logout failed')
    }
  };

export default onLogout;