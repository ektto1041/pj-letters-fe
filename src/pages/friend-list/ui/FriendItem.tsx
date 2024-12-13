import { Friend } from "@/features";
import styles from "./FriendItem.module.css";
import OutgoingMailDisabledImg from "@assets/outgoing-mail-disabled.svg";
import OutgoingMailImg from "@assets/outgoing-mail.svg";
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
      <div className={styles["profile-img-wrapper"]}></div>
      <div className={`${styles.name} text-sm`}>{friend.name}</div>
      <div className={styles["icon-wrapper"]}>
        <img
          src={friend.hasCard ? OutgoingMailImg : OutgoingMailDisabledImg}
          alt="OutGoingMailImg"
        />
      </div>
    </div>
  );
}
