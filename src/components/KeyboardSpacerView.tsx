import React, { useEffect, useLayoutEffect, useState } from "react";
import { Keyboard, KeyboardEvent, View } from "react-native";

export const KeyboardSpacerView: React.FC = ({ style }: { style?: any }) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    // let event1 = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    let event2 = Keyboard.addListener("keyboardDidShow", keyboardWillShow);
    let event3 = Keyboard.addListener("keyboardWillHide", keyboardWillHide);

    return () => {
      // Keyboard.removeSubscription(event1);
      Keyboard.removeSubscription(event2);
      Keyboard.removeSubscription(event3);
    };
  }, [false]);

  const keyboardWillShow = (event: KeyboardEvent) => {
    setHeight(event.endCoordinates.height);
  };

  const keyboardWillHide = (event: KeyboardEvent) => {
    setHeight(0);
  };

  return (
    <View
      style={[
        style && style,
        {
          height: height,
        },
      ]}
    />
  );
};
