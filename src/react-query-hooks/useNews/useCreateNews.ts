import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import baseUrl from "../../utils/baseUrl";

export default function useGetWhatIsNew(limit: number) {
  return useQuery({
    queryKey: ["whatIsNew", limit],
    queryFn: () =>
        axios
        .get(`${baseUrl}/news/whatIsNew?limit=${limit}`)
        .then((res) => res.data.data.data)
  } 
  );
}