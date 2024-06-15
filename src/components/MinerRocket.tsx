import { useMemo } from "react";
import { Image } from "@tarojs/components";
import IconMiner from "@/assets/miner.png";
import { Miner } from "../data";
import { mapPosition } from "../common";

export function MinerRocker({ item }: { item: Miner }) {
  const { x, y } = useMemo(() => {
    return mapPosition({ x: item.x, y: item.y });
  }, [item.x, item.y]);

  return (
    <Image
      src={IconMiner}
      style={{
        left: x,
        top: y,
        transform: `rotate(-${
          item.targetType !== "Planet" ? 180 - item.angle : item.angle
        }deg)`,
      }}
      className="absolute transition-all ease-linear duration-1000 w-28px"
    />
  );
}
