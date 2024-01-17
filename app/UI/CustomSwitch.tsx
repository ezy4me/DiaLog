import React, { useState } from "react";

import { View, TouchableOpacity } from "react-native";

import { Text } from "native-base";
const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  options,
  onSelectSwitch,
  selectionColor,
}: any) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = (val: any, index: number) => {
    console.log('custom switch:', val);
    
    setSelectionMode(val);
    onSelectSwitch(val, index);
  };

  return (
    <View>
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "white",
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: "row",
          justifyContent: "center",
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(options[0].value, 0)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == options[0].value ? selectionColor : "white",
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text
            style={{
              color: getSelectionMode == options[0].value ? "white" : selectionColor,
            }}>
            {options[0].label}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(options[1].value, 1)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == options[1].value ? selectionColor : "white",
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text
            style={{
              color: getSelectionMode == options[1].value ? "white" : selectionColor,
            }}>
            {options[1].label}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;
