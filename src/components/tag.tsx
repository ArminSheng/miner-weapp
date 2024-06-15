import { Text } from "@tarojs/components";

export function Tag({ children, className }) {
  return (
    <Text className={"text-10px rounded-sm py-3px px-6px bg-card " + className}>
      {children}
    </Text>
  );
}
