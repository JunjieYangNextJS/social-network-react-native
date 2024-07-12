import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { Poll, User } from "../../../types";
import { usePatchPostVotes } from "../../react-query-hooks/usePosts/usePatchPost";
import { useQueryClient } from "@tanstack/react-query";
import { useAppTheme } from "../../theme";
import calcTimeAgo from "../../utils/calcTimeAgo";

interface IPostPoll {
  poll: Poll[];
  pollEndsAt: string;
  myVotes: string[];
  postId: string;
}

export default function PostPoll({
  poll,
  pollEndsAt,
  myVotes,
  postId,
}: IPostPoll) {
  const [voted, setVoted] = useState("");

  const { mutate: patchPostVotes } = usePatchPostVotes(postId);
  const queryClient = useQueryClient();
  const theme = useAppTheme();

  useEffect(() => {
    if (poll.some((el) => myVotes?.includes(el._id))) {
      setVoted(poll.find((el) => myVotes?.includes(el._id))?._id || "");
    }
  }, [myVotes, poll]);

  const totalVotes = poll.reduce((n, { votes }) => n + votes, 0);

  const votingHasEnded = Date.parse(pollEndsAt) < Date.now();

  const handleVote = async (id: string) => {
    if (votingHasEnded) return;

    if (voted === id) {
      patchPostVotes({ post: postId, removeId: voted });
      setVoted("");

      const newMyVotes = myVotes.filter((el) => el !== voted);

      await queryClient.cancelQueries({ queryKey: ["user"], exact: true });
      queryClient.setQueryData(["user"], (old: User) => ({
        ...old,
        myVotes: newMyVotes,
      }));
    } else {
      patchPostVotes({ post: postId, removeId: voted, addId: id });
      setVoted(id);

      const newMyVotes = myVotes.filter((el) => el !== voted);
      newMyVotes.push(id);

      await queryClient.cancelQueries({ queryKey: ["user"], exact: true });
      queryClient.setQueryData(["user"], (old: User) => ({
        ...old,
        myVotes: newMyVotes,
      }));
    }
  };

  return (
    <View style={styles.progressContainer}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{totalVotes} people voted</Text>
      </View>
      {poll.map(({ _id, votes, label }) =>
        votingHasEnded ? (
          <View style={styles.progressBarWrapper} key={_id}>
            <Pressable onPress={() => handleVote(_id)}>
              <ProgressBar
                progress={votes / totalVotes || 0}
                style={styles.progressBar}
                color={voted === _id ? theme.colors.primary : "#e3d2fc"}
              />
              <Text style={styles.progressText}>
                {label}: {Math.round((votes / totalVotes) * 100) || 0}%
              </Text>
            </Pressable>
          </View>
        ) : voted ? (
          <View style={styles.progressBarWrapper} key={_id}>
            <Pressable onPress={() => handleVote(_id)}>
              <ProgressBar
                progress={votes / totalVotes || 0}
                style={styles.progressBar}
                color={voted === _id ? theme.colors.primary : "#e3d2fc"}
              />
              <Text style={styles.progressText}>
                {label}: {Math.round((votes / totalVotes) * 100) || 0}%
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.progressBarWrapper} key={_id}>
            <Pressable onPress={() => handleVote(_id)}>
              <ProgressBar
                progress={0}
                style={styles.progressBar}
                color={"#e3d2fc"}
              />
              <Text style={styles.progressText}>{label}</Text>
            </Pressable>
          </View>
        )
      )}
      <View style={styles.textWrapper}>
        <Text style={styles.text}>
          Voting {votingHasEnded ? "ended" : "ends"} {calcTimeAgo(pollEndsAt)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  progressBarWrapper: {
    position: "relative",
    margin: 8,
  },
  progressBar: {
    height: 22,
    borderRadius: 2,
    backgroundColor: "#514c57",
  },
  progressText: {
    position: "absolute",
    top: 3,
    left: 5,
    fontSize: 13,
    fontWeight: "600",
  },

  textWrapper: {
    display: "flex",
    alignItems: "flex-end",
  },

  text: {
    color: "#cccccc",
    fontSize: 12,
  },
});
