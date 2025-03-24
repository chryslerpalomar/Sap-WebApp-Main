import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface SugarIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const SugarIcon: React.FC<SugarIconProps> = ({
  onClick,
  size = 118,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 118 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.4546 0H77.4644C79.0311 0 80.3012 1.27012 80.3012 2.83685V56.8466C80.3012 58.4133 79.0311 59.6835 77.4644 59.6835H23.4546C21.8879 59.6835 20.6178 58.4133 20.6178 56.8466V2.83685C20.618 1.27012 21.8879 0 23.4546 0Z"
        fill="#A1A1A1"
      />
      <path
        d="M23.4546 0H49.6389V59.6835H23.4546C21.8879 59.6835 20.6178 58.4133 20.6178 56.8466V2.83685C20.618 1.27012 21.8879 0 23.4546 0Z"
        fill="#D6D6D6"
      />
      <path
        d="M70.0624 35.1871L116.602 62.5931C117.952 63.388 118.402 65.1269 117.607 66.477L90.2013 113.017C89.4064 114.367 87.6675 114.817 86.3174 114.022L39.7778 86.6156C38.4277 85.8207 37.9779 84.0819 38.7727 82.7318L66.1788 36.192C66.9736 34.8419 68.7125 34.3918 70.0624 35.1871Z"
        fill="#A9A9A9"
      />
      <path
        d="M2.83685 54.1361H56.8466C58.4133 54.1361 59.6835 55.4062 59.6835 56.9729V110.983C59.6835 112.549 58.4133 113.82 56.8466 113.82H2.83685C1.27012 113.82 0 112.549 0 110.983V56.9729C0 55.4062 1.27012 54.1361 2.83685 54.1361Z"
        fill="#BEBEBE"
      />
      <path
        d="M2.83685 54.1361H49.6387V113.82H2.83685C1.27012 113.82 0 112.549 0 110.983V56.9729C0 55.4062 1.27012 54.1361 2.83685 54.1361Z"
        fill="#E9E9E9"
      />
    </MotionSvg>
  );
};

export default SugarIcon;
