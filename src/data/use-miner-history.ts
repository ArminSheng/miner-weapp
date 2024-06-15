import { useQuery } from "react-query";
import fetch from "@/common/fetch";
import { Apis } from "./api";
import { History } from "./types";

const queryKey = "miner-history";

export function useMinerHistory(minerId?: string) {
  return useQuery<History[]>([queryKey, minerId], () => fetcher(minerId), {
    refetchInterval: 1000,
    enabled: !!minerId,
  });
}

function fetcher(minerId?: string) {
  console.log("fetch =====", fetch);

  return fetch(`${Apis.history}?minerId=${minerId}`).then((res) => res.data);
}
