import { Text } from "react-native-paper";
import React from "react";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

const textArray = [
  {
    text: "P",
    color: "#E40303",
  },
  {
    text: "r",
    color: "#FF8C00",
  },
  {
    text: "i",
    color: "#FFED00",
  },
  {
    text: "d",
    color: "#008026",
  },
  {
    text: "e",
    color: "#24408E",
  },
  {
    text: "r",
    color: "#732982",
  },
  {
    text: "s",
    color: "#7E38BF",
  },
  {
    text: ".",
    color: "white",
  },
  {
    text: "n",
    color: "#FFED00",
  },
  {
    text: "e",
    color: "#FF8C00",
  },
  {
    text: "t",
    color: "#E40303",
  },
];

export default function PridersNetText({
  variant,
}: {
  variant?: VariantProp<never> | undefined;
}) {
  return (
    <Text variant={variant}>
      {textArray.map(({ text, color }, i) => (
        <Text style={{ color }} key={i}>
          {text}
        </Text>
      ))}
    </Text>
  );
}
