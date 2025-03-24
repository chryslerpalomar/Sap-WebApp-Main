import FH from "@/classes/FH";
import { MyUser } from "@/classes/MyUser";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useFHPagination } from "@/hooks/useFHPagination";
import SocialMediaSample from "../z/SocialMedia/SocialMediaSample";
import MiniDataBox from "@/components/templates/MiniDataBox";
import { useC } from "@/hooks/useReactHooks";
import { FHContext } from "../templates/FH_Wrapper";
import TemperatureIcon from "@/components/custom/TemperatureIcon";
import SugarIcon from "@/components/custom/SugarIcon";
import VinegarIcon from "@/components/custom/VinegarIcon";
import WineIcon from "@/components/custom/WineIcon";
import WarningIcon from "@/components/svg/icon/WarningIcon";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  const { device } = useC(FHContext);

  const isSugar = device?.type.toLowerCase() === "sugar";
  const isVinegar = device?.type.toLowerCase() === "vinegar";
  const isWine = device?.type.toLowerCase() === "wine";

  let targetTemp = "0";
  let targetPH = "0";

  if (isSugar) {
    targetTemp = "15";
    targetPH = "6.0 - 7.5";
  } else if (isVinegar) {
    targetTemp = "30";
    targetPH = "3.5 - 5.5";
  } else if (isWine) {
    targetTemp = "32";
    targetPH = "5.5";
  }

  const cannotBeFermented = isSugar && device?.ph < 6.0;

  return (
    <PageContainer>
      <Txt.title className="">PDPalmSAP</Txt.title>
      {/*//? Current Readings */}
      <div className="csc-2 wf">
        <p className="t66">Current Readings</p>
        <div className="wf rcc-6">
          <MiniDataBox
            data={device?.temperature ?? 0}
            title="Temperature"
            icon={<TemperatureIcon />}
            unit="°C"
          />
          <MiniDataBox
            data={device?.ph ?? 0}
            title="pH"
            icon={<TemperatureIcon />}
            unit=""
          />
        </div>
      </div>

      {/*//? Selected Type */}
      <div className="csc-2 wf">
        <p className="t53 o-50">Selected Type</p>
        <div className="csc-6 border border-white rounded-xl pt-6 pb-2 w-64">
          {/*//? Icon */}
          {isSugar && <SugarIcon />}
          {isWine && <WineIcon />}
          {isVinegar && <VinegarIcon />}
          <div className="css">
            {/*//? Temp */}
            <div className="rse-2">
              <p className="t43">Temperature: </p>
              <p className="t43 o-50">{targetTemp} °C</p>
            </div>

            {/*//? pH */}
            <div className="rse-2">
              <p className="t43">pH: </p>
              <p className="t43 o-50">{targetPH}</p>
            </div>
          </div>
          {/*//? Type */}
          <p className="t64">{device?.type.toUpperCase()}</p>
        </div>
      </div>

      {/*//? Selected Type */}
      {cannotBeFermented && (
        <div className="wf ccc">
          <div className="rsc-6 border border-white rounded-xl py-2 px-2 w-64">
            <WarningIcon size={75} />
            <p className="t43 o-80">
              Sap can no longer be fermented into sugar
            </p>
          </div>
        </div>
      )}
      <WebsiteVersion />
    </PageContainer>
  );
};

export default MainPage;
