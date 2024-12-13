import { Friend } from "@/features";
import styles from "./FriendItem.module.css";
import OutgoingMailDisabledImg from "@assets/outgoing-mail-disabled.svg";
import OutgoingMailImg from "@assets/outgoing-mail.svg";

interface FriendItemProps {
  friend: Friend;
}

export default function FriendItem({ friend }: FriendItemProps) {
  return (
    <div className={styles.container}>
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
