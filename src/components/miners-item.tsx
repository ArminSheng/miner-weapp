import { View, Text, Image } from "@tarojs/components";
import { Miner, MinerStatuses } from "@/data";
import Arrow from "@/assets/arrow_forward_ios.png";
import { Tag } from "./tag";
import { classNames } from "./util";

export function MinersItem({ item }: { item: Miner }) {
  return (
    <View className="rounded py-3 px-4 flex  justify-between bg-card">
      <View className="flex flex-col justify-between">
        <Text className="text-[8px]">{item.planet.name}</Text>
        <Text className="text-[18px]">{item.name}</Text>

        <View>
          <Tag className="mt-3">{MinerStatuses[item.status]}</Tag>
        </View>
      </View>

      <View className="flex">
        <View className="">
          <View className="text-[9px] text-second">Carry Capacity</View>
          <View
            className={classNames(
              " text-[14px]",
              item.minerals >= item.carryCapacity ? "text-g" : ""
            )}
          >
            {item.minerals}/{item.carryCapacity}
          </View>

          <View className="text-[9px] text-second mt-1">Position</View>
          <View className="text-[14px]">
            {item.x.toFixed()},{item.y.toFixed()}
          </View>
        </View>

        <View className="ml-4">
          <View className="text-[9px] text-second">Travel Speed</View>
          <View className="text-[14px]">{item.miningSpeed}</View>
        </View>
      </View>

      <View className="flex items-center">
        <Image src={Arrow} className="w-[9.5px] h-[16px]" />
      </View>
    </View>
  );
}
