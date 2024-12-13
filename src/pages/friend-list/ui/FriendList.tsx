import { Header } from "@/widgets";
import styles from "./FriendList.module.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Friend } from "@/features";
import FriendItem from "./FriendItem";

export default function FriendList() {
  const navigate = useNavigate();

  const [friends, setFriends] = useState<Friend[]>([]);

  const getFriends = useCallback(async () => {
    setFriends([
      {
        userId: "1",
        name: "Friend 1",
        hasCard: false,
      },
      {
        userId: "2",
        name: "Friend 2",
        hasCard: true,
      },
      {
        userId: "3",
        name: "Friend 3",
        hasCard: false,
      },
    ]);
  }, []);

  useEffect(() => {
    getFriends();
  }, []);

  const handleClickBackButton = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header title="친구 목록" onClickBackButton={handleClickBackButton} />
      </div>
      <div className={styles.content}>
        <div className={styles.messages}>
          <h3 className="header-h2">친구목록</h3>
          <p className="text-sm">메시지를 남길 친구를 선택하세요</p>
          <p className="text-sm">모든 메시지는 비밀이 유지됩니다</p>
        </div>
        <div className={styles["list-box"]}>
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
}
