import {
  CommonEventFunction,
  ITouchEvent,
  TouchEventFunction,
  View,
} from "@tarojs/components";
import { Fragment, useCallback, useState } from "react";
import { classNames } from "./util";
import { MinersItem } from "./miners-item";
import { log } from "console";
import { useMinerHistory, useMiners, useSocket } from "@/data";

let lastY;

export function PagePopup() {
  const [open, setOpen] = useState(false);

  const [data] = useSocket();

  const popup = useCallback(() => {
    setOpen((isOpen) => !isOpen);
  }, []);

  const onTouchStart = useCallback((e: ITouchEvent) => {
    lastY = e.touches[0].pageY;
  }, []);

  const onTouchMove = useCallback((e: ITouchEvent) => {
    const pageY = e.touches[0].pageY;

    if (lastY - pageY > 50) setOpen(true);
    if (pageY - lastY > 50) setOpen(false);
  }, []);

  return (
    <>
      <View
        className={classNames(
          "popup-wrap overflow-hidden flex flex-col",
          open ? "up" : ""
        )}
      >
        <View
          className=" flex justify-center py-5"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        >
          <View onClick={popup} className="popup-bar bg-white"></View>
        </View>

        <View
          className={classNames(
            " mt-5 transition-opacity duration-300 overflow-y-auto",
            open ? "opacity-1" : "opacity-0"
          )}
        >
          <View className="flex flex-col px-5 gap-y-4">
            {data.miners.map((item) => (
              <Fragment key={item._id}>
                <MinersItem item={item}></MinersItem>
              </Fragment>
            ))}
          </View>
        </View>
      </View>
    </>
  );
}
