import { LineChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import { Center, useColorMode } from "native-base";
import getCurrentDate from "@/utils/getCurrentDate";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function NutritionChart({ data }: any) {
  const { colorMode } = useColorMode();

  const totalCalories = (item: any) => {
    if (
      data &&
      Array.isArray(data) &&
      item &&
      item.dish &&
      item.dish.foodDishes &&
      Array.isArray(item.dish.foodDishes)
    ) {
      const t = item.dish.foodDishes.reduce((total: any, dish: any) => {
        const energy = parseFloat(dish.food.energy);
        const weight = parseFloat(dish.weight);
        if (!isNaN(energy) && !isNaN(weight)) {
          return total + (energy * weight) / 100;
        } else {
          return total;
        }
      }, 0);

      return t !== undefined ? Math.round(t) : 0;
    } else {
      return 0;
    }
  };

  const chartData = {
    labels:
      Array.isArray(data) && data.length > 0
        ? data?.map((item: any) => getCurrentDate(item.date).substring(0, 5))
        : [],
    datasets: [
      {
        data:
          Array.isArray(data) && data.length > 0
            ? data?.map((item: any) => totalCalories(item))
            : [],
      },
    ],
  };

  return (
    <View style={{ width: "100%", height: 255 }}>
      {Array.isArray(data) && data.length === 0 ? (
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
