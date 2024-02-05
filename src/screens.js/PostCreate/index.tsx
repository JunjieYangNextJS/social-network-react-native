import {
  Platform,
  ScrollView,
  InputAccessoryView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import InputAccessoryIconsBar from "./InputAccessoryIconsBar";
import IOS_UI from "./IOS_UI";
import Android_UI from "./Android_UI";
import useCreatePost from "../../react-query-hooks/usePosts/useCreatePost";
import * as yup from "yup";
import { Formik } from "formik";
import { About, ExposedTo } from "../../../types";

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { getItemAsync } from "expo-secure-store";
import useToastStore from "../../store/useToastStore";

import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import PollDialog from "../../components/Dialogs/PollDialog";
import DraftsDialog from "../../components/Dialogs/DraftsDialog";
// import { TextInput } from "react-native-paper";

const validationSchema = yup.object({
  title: yup.string().max(50).required("Title is required"),
  content: yup.string(),
});
const FormData = global.FormData;

type Props = NativeStackScreenProps<RootStackParamList, "PostCreate">;

export const aboutArray = [
  { value: "General", label: "General" },
  { value: "L", label: "Lesbian" },
  { value: "G", label: "Gay" },
  { value: "B", label: "Bisexual" },
  { value: "T", label: "Transgender" },
  { value: "Q", label: "Queer/ ?" },
  { value: "I", label: "Intersex" },
  { value: "A", label: "Asexual" },
  { value: "2S", label: "Two-Spirit" },
  { value: "+More", label: "+More" },
];

export const exposedToArray = [
  { value: "public", label: "Anyone" },
  {
    value: "friendsAndFollowersOnly",
    label: "Only my friends and followers",
  },
  { value: "friendsOnly", label: "Only my friends" },
  { value: "private", label: "Only me" },
];

export default function PostCreate({ navigation }: Props) {
  const [pollVisible, setPollVisible] = useState(false);
  const [options, setOptions] = useState<string[]>(["", ""]);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const { mutate: createNewPost, data } = useCreatePost();

  const { onOpenToast } = useToastStore();

  const onSetImageUri = (uri: string | null) => {
    setImageUri(uri);
  };

  const onTogglePoll = () => {
    setPollVisible((prev) => !prev);
  };

  const onConfirmPoll = () => {
    setPollVisible(false);
  };

  const onCancelPoll = () => {
    setOptions(["", ""]);
    setPollVisible(false);
  };

  const onAddOption = () => {
    setOptions((prev) => {
      if (prev.length >= 10) {
        return prev;
      }
      return [...prev, ""];
    });
  };

  const onSetOption = (index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = prevOptions.slice();
      newOptions[index] = value;
      return newOptions;
    });
  };

  const onDeleteOption = (index: number) => {
    setOptions((prevOptions) => {
      const newOptions = prevOptions.slice();
      newOptions.splice(index, 1);
      return newOptions;
    });
  };

  const fetchImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return blob;
  };

  const handleImageUpload = async () => {
    if (!imageUri) return;

    const result = await manipulateAsync(
      imageUri,
      [{ resize: { width: 500, height: 500 } }],
      {
        compress: 1,
        format: SaveFormat.JPEG,
      }
    );

    const file = await fetchImage(result.uri);

    const token = await getItemAsync("token");

    const s3Url = await axios
      .get(`${baseUrl}/users/expoPostStoryImageUpload`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        onOpenToast("error", "");
        return Promise.reject(err);
      })
      .then((res) => res.data.url);

    await fetch(s3Url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = s3Url.split("?")[0];

    return imageUrl;
  };

  return (
    <>
      <DraftsDialog navigation={navigation} />
      <Formik
        initialValues={{
          title: "",
          content: "",
          about: "General" as About,
          exposedTo: "public" as ExposedTo,
          draft: false,
          willNotify: true,
          hours: "0",
          pollDays: "30",
        }}
        onSubmit={async (values) => {
          if (values.draft) {
            createNewPost({
              content: `<p>${values.content}</p>`,
              title: values.title,
              about: values.about,
              exposedTo: values.exposedTo,
              willNotify: values.willNotify,
              createdAt: Date.now() + Number(values.hours) * 1000 * 60 * 60,
              lastCommentedAt:
                Date.now() + Number(values.hours) * 1000 * 60 * 60,
              draft: true,
            });
          } else {
            // dealing with poll
            let pollArray = [] as Record<"label", string>[];
            const appendOptions = (args: string[]) => {
              for (const arg of args) {
                if (arg) pollArray.push({ label: arg });
              }
            };
            appendOptions(options);

            // dealing with content
            let content = values.content;

            if (imageUri) {
              const imageUrl = await handleImageUpload();

              const newString = `<img src=${imageUrl} />`;
              content = newString + content;
            }

            if (pollArray.length > 1) {
              createNewPost({
                content: `<p>${content}</p>`,
                title: values.title,
                about: values.about,
                exposedTo: values.exposedTo,
                willNotify: values.willNotify,
                createdAt: Date.now() + Number(values.hours) * 1000 * 60 * 60,
                lastCommentedAt:
                  Date.now() + Number(values.hours) * 1000 * 60 * 60,
                poll: pollArray,
                pollEndsAt:
                  Date.now() + Number(values.pollDays) * 1000 * 60 * 60 * 24,
                draft: false,
              });
            } else {
              createNewPost({
                content: `<p>${content}</p>`,
                title: values.title,
                about: values.about,
                exposedTo: values.exposedTo,
                willNotify: values.willNotify,
                createdAt: Date.now() + Number(values.hours) * 1000 * 60 * 60,
                lastCommentedAt:
                  Date.now() + Number(values.hours) * 1000 * 60 * 60,
                draft: false,
              });
            }
          }

          // createNewPost({
          //   content: `<p>${content}</p>`,
          //   title: values.title,
          //   about,
          //   exposedTo,
          //   willNotify: values.willNotify,
          //   createdAt: Date.now() + Number(values.hours) * 1000 * 60 * 60,
          //   lastCommentedAt: Date.now() + Number(values.hours) * 1000 * 60 * 60,
          //   poll: pollArray,
          //   pollEndsAt:
          //     Date.now() + (hasPoll ? values.pollDays : 0) * 1000 * 60 * 60 * 24,
          // });
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,

          isSubmitting,
        }) => (
          <>
            <PollDialog
              pollVisible={pollVisible}
              onTogglePoll={onTogglePoll}
              onConfirmPoll={onConfirmPoll}
              onCancelPoll={onCancelPoll}
              options={options}
              onAddOption={onAddOption}
              onSetOption={onSetOption}
              onDeleteOption={onDeleteOption}
              pollDays={values.pollDays}
              onSetPollDays={handleChange("pollDays")}
            />
            {Platform.OS === "ios" ? (
              <IOS_UI
                title={values.title}
                content={values.content}
                hours={values.hours}
                onSetHours={handleChange("hours")}
                onSetContent={handleChange("content")}
                onSetTitle={handleChange("title")}
                onSubmit={handleSubmit}
                onSetImageUri={onSetImageUri}
                imageUri={imageUri}
                about={values.about}
                aboutArray={aboutArray}
                exposedTo={values.exposedTo}
                exposedToArray={exposedToArray}
                onToggleHasPoll={onTogglePoll}
                isSubmitting={isSubmitting}
                draft={values.draft}
              />
            ) : (
              <Android_UI
                title={values.title}
                content={values.content}
                onSetContent={handleChange("content")}
                onSetTitle={handleChange("title")}
              />
            )}
            <InputAccessoryIconsBar
              onSubmit={handleSubmit}
              title={values.title}
              onSetImageUri={onSetImageUri}
              about={values.about}
              hours={values.hours}
              onSetHours={handleChange("hours")}
              aboutArray={aboutArray}
              exposedTo={values.exposedTo}
              exposedToArray={exposedToArray}
              onToggleHasPoll={onTogglePoll}
              isSubmitting={isSubmitting}
              draft={values.draft}
            />
          </>
        )}
      </Formik>
    </>
  );
}
