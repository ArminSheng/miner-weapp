import { View, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { PagePopup } from "@/components/page-popup";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/data";
import { Galaxy } from "@/components/galaxy";
import Logo from "@/assets/logo.png";
import "./index.scss";

export default function Index() {
  useLoad(() => {});

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <View className="top-bar flex justify-center items-end pb-3 box-border">
          <Image src={Logo} className="w-[24px] mt-4" />
        </View>
        <View className="index relative px-3">
          <View className="flex justify-center py-2"></View>

          <Galaxy />
        </View>
        <PagePopup></PagePopup>
      </QueryClientProvider>
    </>
  );
}
