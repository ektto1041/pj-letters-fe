import { Friend } from "@/features";
import styles from "./FriendItem.module.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface FriendItemProps {
  friend: Friend;
}

export default function FriendItem({ friend }: FriendItemProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/tree/${friend.userId}`);
  }, [friend]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles["profile-img-wrapper"]}>
        <img src={friend.profile} alt="ProfileImg" />
      </div>
      <div className={`${styles.name} text-sm`}>{friend.nickname}</div>
    </div>
  );
}
