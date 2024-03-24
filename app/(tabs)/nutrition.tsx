import React, { useState } from "react";
import { VStack } from "native-base";
import FoodList from "@/components/Food/FoodList";
import NutritionControls from "@/components/Food/NutritionControls";
import DishList from "@/components/Food/DishList";

const Page = () => {
  const [dataType, setDataType] = useState("food");

  let dataListComponent;

  switch (dataType) {
    case "food":
      dataListComponent = <FoodList />;
      break;
    case "dish":
      dataListComponent = <DishList />;
      break;
    default:
      dataListComponent = null;
  }

  return (
    <VStack
      _light={{ bg: "coolGray.50" }}
      _dark={{ bg: "coolGray.900" }}
      borderRadius={0}
      w="100%"
      minH={"100%"}
      alignItems="center"
      space="2"
      px="4">
      <NutritionControls onDataTypeChange={setDataType} />
      {dataListComponent}
    </VStack>
  );
};

export default Page;
