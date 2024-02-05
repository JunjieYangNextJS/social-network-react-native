import { Platform, ScrollView, InputAccessoryView } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, IconButton } from "react-native-paper";
import InputAccessoryIconsBar from "../PostCreate/InputAccessoryIconsBar";
import IOS_UI from "../PostCreate/IOS_UI";
import Android_UI from "../PostCreate/Android_UI";
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
import useDraftPost from "../../react-query-hooks/usePosts/useDraftPost";
import { aboutArray, exposedToArray } from "../PostCreate";
import DraftsDialog from "../../components/Dialogs/DraftsDialog";
import { usePatchDraftToPost } from "../../react-query-hooks/usePosts/usePatchPost";
// import { TextInput } from "react-native-paper";

const validationSchema = yup.object({
  title: yup.string().max(50).required("Title is required"),
  content: yup.string(),
});

type Props = NativeStackScreenProps<RootStackParamList, "PostDraft">;

export default function PostDraft({ navigation, route }: Props) {
  // get initial data from draft
  const { postId } = route.params;
  const { data: post } = useDraftPost(postId);

  const { mutate: patchDraftToPost } = usePatchDraftToPost(postId, navigation);

  // states
  const [pollVisible, setPollVisible] = useState(false);
  const [options, setOptions] = useState<string[]>(["", ""]);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const { mutate: createNewPost } = useCreatePost();

  const { onOpenToast } = useToastStore();

  if (!post) return <ActivityIndicator />;

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
      <DraftsDialog navigation={navigation} currentScreenPostId={postId} />
      <Formik
        initialValues={{
          title: post.title,
          content: post.content.replace(/<\/?p>/g, ""),
          about: post.about,
          exposedTo: post.exposedTo,
          willNotify: post.willNotify,
          draft: true,
          hours: "0",
          pollDays: "30",
          readyToSubmit: false,
        }}
        onSubmit={async (values) => {
          // setIsPending(true);
          // dealing with poll
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
              if (values.readyToSubmit) {
                patchDraftToPost({
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
                  poll: pollArray,
                  pollEndsAt:
                    Date.now() + Number(values.pollDays) * 1000 * 60 * 60 * 24,
                  draft: false,
                });
              }
            } else {
              if (values.readyToSubmit) {
                patchDraftToPost({
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
          }
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
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
                draftPostId={post._id}
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
              draftPostId={post._id}
            />
          </>
        )}
      </Formik>
    </>
  );
}
