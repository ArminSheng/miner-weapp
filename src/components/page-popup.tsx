import { ITouchEvent, View, Image, Text } from "@tarojs/components";
import { useSocket } from "@/data";
import { Fragment, useCallback, useState } from "react";
import IconMiner from "@/assets/miners-on.png";
import IconAsteroid from "@/assets/asteroids-off.png";
import IconPlanet from "@/assets/planets-off.png";
import { classNames } from "./util";
import { MinersItem } from "./miners-item";

let lastY;

const Tabs = [
  {
    name: "Miners",
    icon: <Image className="w-[32px] h-[32px]" src={IconMiner} />,
    //   component: MinerTab,
  },
  {
    name: "Asteroids",
    icon: <Image className="w-[32px] h-[32px]" src={IconAsteroid} />,
    //   component: AsteroidTab,
  },
  {
    name: "Planets",
    icon: <Image className="w-[32px] h-[32px]" src={IconPlanet} />,
    //   component: PlanetTab,
  },
];

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
          "popup-wrap backdrop-blur-4 overflow-hidden flex flex-col",
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

        <View className="flex items-start justify-between pb-[30px] px-7 pt-4">
          {Tabs.map((tab) => (
            <View key={tab.name} className="flex flex-col items-center">
              <View>{tab.icon}</View>
              <Text className="text-[12px]">{tab.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
