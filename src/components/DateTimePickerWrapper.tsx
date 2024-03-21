import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";

interface IDateTimePickerWrapper {
  setDate: (event: DateTimePickerEvent, date: Date | undefined) => void;
  inputDate: {
    birthYear?: number | undefined;
    birthMonth?: number | undefined;
    birthDay?: number | undefined;
  };
}

export default function DateTimePickerWrapper({
  setDate,
  inputDate,
}: IDateTimePickerWrapper) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleShowDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  return (
    <>
      {Platform.OS === "ios" ? (
        <DateTimePicker
          mode="date"
          value={
            new Date(
              inputDate.birthYear || 1993,
              inputDate.birthMonth ? inputDate.birthMonth - 1 : 0,
              //   (inputDate.birthMonth && inputDate.birthMonth - 1) || 1,
              inputDate.birthDay || 1
            )
          }
          onChange={(event: DateTimePickerEvent, date: Date | undefined) =>
            setDate(event, date)
          }
          maximumDate={new Date()}
          themeVariant="dark"
        />
      ) : (
        <>
          <Button onPress={handleShowDatePicker}>Show Date Picker</Button>
          {isDatePickerVisible && (
            <DateTimePicker
              mode="date"
              value={
                new Date(
                  inputDate.birthYear || 1993,
                  inputDate.birthMonth ? inputDate.birthMonth - 1 : 0,
                  inputDate.birthDay || 1
                )
              }
              onChange={(
                event: DateTimePickerEvent,
                date: Date | undefined
              ) => {
                setIsDatePickerVisible(false);
                setDate(event, date);
              }}
              maximumDate={new Date()}
              themeVariant="dark"
            />
          )}
        </>
      )}
    </>
  );
}
