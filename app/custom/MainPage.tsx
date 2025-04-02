//mainpage.tsx

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

//added for new feature
import { useState } from "react";
import Button from "@/components/ui/Button";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";

//const db = getFirestore();

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  const { device } = useC(FHContext);

  const isSugar = device?.type.toLowerCase() === "sugar";
  const isVinegar = device?.type.toLowerCase() === "vinegar";
  const isWine = device?.type.toLowerCase() === "wine";
  const isOther = !(isSugar || isVinegar || isWine);

  // Selection control states
  const [selectionToggle, setSelectionToggle] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(device?.type || "Sugar");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deviceId = device?.id || "readings"; // Fallback if device.id is undefined
  // Function to toggle selection control
  const toggleSelection = async () => {
    const newToggleState = !selectionToggle;
    setSelectionToggle(newToggleState);

    try {
      await updateDoc(doc(db, "device", "readings"), {
        lock: newToggleState ? "on" : "off" // Sync selectionToggle with Firestore lock field
      });
    } catch (error) {
      console.error("Error updating Firestore lock status:", error);
    }
    
    // If toggle is set to ON, update Firestore (Case A)
    if (newToggleState) {
      try {
        await updateDoc(doc(db, "devices", deviceId), {
          type: selectedProduct, // Web app controls product selection
        });
      } catch (error) {
        console.error("Error updating Firestore product type:", error);
      }
    }
  };

  // Function to change product (only when selectionToggle is ON)
  const handleChangeProduct = async () => {
    if (selectionToggle) {
      const newProduct =
        selectedProduct === "Sugar" ? "Wine" : selectedProduct === "Wine" ? "Vinegar" : "Sugar";
        setSelectedProduct(newProduct);
        

      // Update Firestore with the new product type
      await updateDoc(doc(db, "devices", deviceId), {
        type: newProduct,
      });
    }
  };

  // Function to handle manual product selection from the modal
  const handleProductSelection = async (product: string) => {
    setSelectedProduct(product);
    closeModal();

    if (selectionToggle) {
      try {
        await updateDoc(doc(db, "device", "readings"), { type: product });
        console.log("Product type updated to:", product);
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



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

      <div className="csc-2 wf">
        <MiniDataBox
          title="Product Selection"
          customContent={
            <div className="flex flex-col items-center justify-center text-center w-full h-full">
              <Button onClick={toggleSelection} className="mt-2 w-full">
                {selectionToggle ? "On" : "Off"}
              </Button>
              <Button onClick={openModal} disabled={!selectionToggle} className="mt-2 w-full">
                Change Product
              </Button>
            </div>
          }
        />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-screen h-screen z-[10000]">
            <div className="bg-[#1b1a1d] p-6 rounded-lg shadow-lg flex flex-col items-center">
              <p className="text-lg font-bold mb-4">Select a Product</p>

              <Button className="w-40 mb-2" onClick={() => handleProductSelection("Sugar")}>
                Sugar
              </Button>
              <Button className="w-40 mb-2" onClick={() => handleProductSelection("Wine")}>
                Wine
              </Button>
              <Button className="w-40 mb-4" onClick={() => handleProductSelection("Vinegar")}>
                Vinegar
              </Button>

              <Button className="w-40 bg-red-500 text-white" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </div>
        )}
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
          {/*<p className="t64">{device?.type.toUpperCase()}</p>*/}
          <p className="t64">
            {isOther ? "LOADING...." : device?.type.toUpperCase()}
          </p>
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

let dummy;

export default MainPage;
