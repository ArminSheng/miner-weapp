import { useEffect, useRef } from "react";
// import { DefaultEventsMap } from "@socket.io/component-emitter";
import { QueryClient, useQuery, useQueryClient } from "react-query";
// import io, { Socket, DefaultEventsMap } from "weapp.socket.io";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import Taro from "@tarojs/taro";
import { TickData } from "./types";
import { ApiEndpoint } from "../common";

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
const wssApiEndpoint = "wss://asteroids.dev.mediasia.cn";

function initSocket(queryClient: QueryClient) {
  if (typeof socket === "undefined") {
    // Taro.request({
    //   url: ApiEndpoint,
    //   success: () => console.log("get success"),
    // });

    // Taro.connectSocket({
    //   url: wssApiEndpoint,
    //   header: {
    //     "content-type": "application/json",
    //   },
    //   protocols: ["protocol1"],
    //   success: () => {
    //     console.log("connect success");
    //   },
    // }).then((task) => {
    //   task.onOpen(function () {
    //     console.log("onOpen");
    //     task.send({ data: "xxx" });
    //   });
    //   task.onMessage(function (msg) {
    //     Taro.showModal({ title: "onMessage" });
    //     console.log("onMessage: ", msg);
    //     alert("====");
    //   });
    //   task.onError(function (err) {
    //     console.log("onError", err);
    //   });
    //   task.onClose(function (e) {
    //     console.log("onClose: ", e);
    //   });
    // });
    socket = io(wssApiEndpoint, {
      path: "",
      autoConnect: false,
    });

    socket.connect();
    console.log("io====", socket);

    socket!.on("tick", (data: TickData) => {
      queryClient.setQueriesData("tick", () => data);
    });

    socket!.on("connect", () => {
      console.log("connected");
    });
  }
  return socket;
}

const initialData: TickData = {
  asteroids: [],
  planets: [],
  miners: [],
  currentTick: 0,
};

export function useSocket() {
  const client = useQueryClient();
  const { current: socketIns } = useRef(initSocket(client));

  const { data } = useQuery<TickData>(["tick"], {
    initialData: initialData,
    queryFn: () => {
      return initialData;
    },
  });

  useEffect(() => {
    if (!socketIns.connected) socketIns.connect();

    return () => {};
  }, [socketIns]);

  return [data || initialData];
}
