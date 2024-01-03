// @ts-ignore
import { LineChart } from "react-native-chart-kit";

import { Dimensions, View } from "react-native";

export function DiabetesChart() {
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
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(67, 56, 202, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "3",
            strokeWidth: "1",
            stroke: "#c7d2fe",
          },
          propsForLabels: {
            fontFamily: "mon",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 4,
        }}
      />
    </View>
  );
}
