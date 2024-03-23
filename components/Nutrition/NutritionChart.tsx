import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import { Center, Spinner, useColorMode } from "native-base";
import getCurrentDate from "@/utils/getCurrentDate";
import useAuthStore from "@/app/store/authStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNutritionStore from "@/app/store/nutritionStore";

export function NutritionChart({ data }: any) {
  const { colorMode } = useColorMode();

  const totalCalories = (item: any) => {
    const total = item.dish.foodDishes.reduce(
      (total: any, dish: any) => total + (dish.food.energy * dish.weight) / 100,
      0
    );
    return total.toFixed(0);
  };

  const chartData = {
    labels: data
      ? data?.map((item: any) => getCurrentDate(item.date).substring(0, 5))
      : [],
    datasets: [
      {
        data: data ? data?.map((item: any) => totalCalories(item)) : [],
      },
    ],
  };

  return (
    <View style={{ width: "100%", height: 255 }}>
      {data?.length === 0 ? (
        <Center h={"full"}>
          <MaterialCommunityIcons
            name="database-clock"
            size={48}
            color={colorMode == "light" ? "black" : "white"}
          />
        </Center>
      ) : (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 32}
          height={240}
          yAxisSuffix="kkal"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom:
              colorMode === "light" ? "#e2e8f0" : "#111827",
            backgroundGradientTo: colorMode === "light" ? "#e2e8f0" : "#111827",
            decimalPlaces: 1,
            color: (opacity = 1) =>
              colorMode === "light"
                ? `rgba(67, 56, 202, ${opacity})`
                : `rgba(224, 231, 255, ${opacity})`,
            labelColor: (opacity = 1) =>
              colorMode === "light"
                ? `rgba(0, 0, 0, ${opacity})`
                : `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "1",
              stroke: "#c7d2fe",
            },
            propsForLabels: {
              fontSize: "12",
              fontFamily: "mon",
            },
          }}
          bezier
          style={{
            marginTop: 16,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
}
