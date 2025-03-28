import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface VinegarIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const VinegarIcon: React.FC<VinegarIconProps> = ({
  onClick,
  size = 67,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 67 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43.3333 78.7879C56.3873 78.7879 66.9697 68.2055 66.9697 55.1515C66.9697 42.0975 56.3873 31.5152 43.3333 31.5152C30.2793 31.5152 19.697 42.0975 19.697 55.1515C19.697 68.2055 30.2793 78.7879 43.3333 78.7879Z"
        fill="#ACABB1"
      />
      <path
        d="M43.3333 66.9697C49.8603 66.9697 55.1515 61.6785 55.1515 55.1515C55.1515 48.6245 49.8603 43.3333 43.3333 43.3333C36.8063 43.3333 31.5152 48.6245 31.5152 55.1515C31.5152 61.6785 36.8063 66.9697 43.3333 66.9697Z"
        fill="white"
      />
      <path
        d="M43.3333 43.3333V31.5151V15.7576H7.87878L19.697 35.4545V43.3333L31.5151 47.2727L43.3333 43.3333Z"
        fill="#CDCDD0"
      />
      <path
        d="M43.3333 15.7576L31.5152 19.697L19.697 15.7576V0H43.3333V15.7576Z"
        fill="#BD720D"
      />
      <path d="M31.5152 0H19.697V15.7576H31.5152V0Z" fill="#804C09" />
      <path
        d="M39.3939 27.5758H23.6364L19.697 15.7576H43.3333L39.3939 27.5758Z"
        fill="#FF9811"
      />
      <path
        d="M31.5152 27.5758H23.6364L19.697 15.7576H31.5152V27.5758Z"
        fill="#BD720D"
      />
      <path
        d="M51.2113 78.687C46.7803 74.75 43.3333 72.8788 43.3333 63.5558V43.3333H31.5152H19.697V63.5558C19.697 72.8788 16.25 74.75 11.819 78.687C5.63373 84.1833 0 92.5758 0 100.455C0 116.212 11.8182 124.091 31.5152 124.091C51.2121 124.091 63.0303 116.212 63.0303 100.455C63.0303 92.5758 57.3966 84.1833 51.2113 78.687Z"
        fill="#FF5023"
      />
      <path
        d="M31.5152 43.3333H19.697V63.5558C19.697 72.8788 16.25 74.75 11.819 78.687C5.63373 84.1833 0 92.5758 0 100.455C0 116.212 11.8182 124.091 31.5152 124.091C31.5152 107.152 31.5152 43.3333 31.5152 43.3333Z"
        fill="#BD3C1A"
      />
      <path
        d="M55.1515 124.091C55.1515 127.354 52.5058 130 49.2424 130H13.7879C10.5245 130 7.87878 127.354 7.87878 124.091C7.87878 120.828 10.5245 118.182 13.7879 118.182H49.2424C52.5058 118.182 55.1515 120.828 55.1515 124.091Z"
        fill="#FF734F"
      />
      <path
        d="M31.5151 118.182H13.7879C10.5245 118.182 7.87878 120.828 7.87878 124.091C7.87878 127.354 10.5245 130 13.7879 130H31.5151V118.182Z"
        fill="#FF5023"
      />
    </MotionSvg>
  );
};

export default VinegarIcon;
