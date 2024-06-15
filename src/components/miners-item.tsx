import { View, Text, Image } from "@tarojs/components";
import Arrow from "@/assets/arrow_forward_ios.png";
import { Tag } from "./tag";

export function MinersItem() {
  return (
    <View className="rounded py-3 px-4 flex  justify-between bg-card">
      <View className="flex flex-col">
        <Text className="text-8px">Planet 1</Text>
        <Text className="text-18px">Miner 1</Text>

        <Tag className="mt-3">Transferring</Tag>
      </View>

      <View className="flex">
        <View className="">
          <View className="text-9px text-second">Carry Capacity</View>
          <View className="text-14px text-g">100 / 2000</View>

          <View className="text-9px text-second mt-1">Position</View>
          <View className="text-14px">100,200</View>
        </View>

        <View className="ml-4">
          <View className="text-9px text-second">Travel Speed</View>
          <View className="text-14px">200</View>
        </View>
      </View>

      <View className="flex items-center">
        <Image src={Arrow} className="w-arrow" />
      </View>
    </View>
  );
}
