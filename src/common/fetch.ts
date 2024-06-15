import Taro from "@tarojs/taro";

export default function fetch(url: string, options?: any) {
  return Taro.request({ url, ...options });
}
