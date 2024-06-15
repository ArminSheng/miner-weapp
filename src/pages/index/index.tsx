import { useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { PagePopup } from "@/components/page-popup";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/data";
import { MinersItem } from "@/components/miners-item";
import "./index.scss";

export default function Index() {
  useLoad(() => {});

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <View className="h-88">11</View>
        <View className="index relative px-3">
          <View className="flex justify-center py-3">
            <Text className="text-white rounded-sm bg-card text-16px p-6px">
              250 YEARS
            </Text>
          </View>
        </View>
        <PagePopup></PagePopup>
      </QueryClientProvider>
    </>
  );
}
