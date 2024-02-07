// @ts-ignore
import { LineChart } from "react-native-chart-kit";

import { Dimensions, View } from "react-native";
import { useColorMode } from "native-base";

export function DiabetesChart() {
  const { colorMode } = useColorMode();

  const today = new Date();

  const generateFormattedDate = () => {
    return Array.from({ length: 7 }, (_, index) => {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - index);

      const formattedDate = `${String(currentDate.getDate()).padStart(
        2,
        "0"
      )}.${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

      return formattedDate;
    }).reverse();
  };

  return (
    <View style={{ width: "100%" }}>
      <LineChart
        data={{
          labels: generateFormattedDate(),
          datasets: [
            {
              data: [
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width - 32}
        height={240}
        yAxisSuffix="mmol"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: colorMode == "light" ? "#e2e8f0" : "#111827",
          backgroundGradientTo: colorMode == "light" ? "#e2e8f0" : "#111827",
          decimalPlaces: 1,
          color: (opacity = 1) => colorMode == 'light' ? `rgba(67, 56, 202, ${opacity})` : `rgba(224, 231, 255, ${opacity})`,
          labelColor: (opacity = 1) =>
            colorMode == "light"
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
            fontSize: '12',
            fontFamily: "mon",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
