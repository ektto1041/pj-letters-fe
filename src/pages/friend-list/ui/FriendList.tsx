import { Header, SimpleDialog, SimpleDialogProps } from "@/widgets";
import styles from "./FriendList.module.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Friend, getFriends, useUserState } from "@/features";
import FriendItem from "./FriendItem";
import { Spinner } from "@/shared";

export default function FriendList() {
  const navigate = useNavigate();

  const { user } = useUserState();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);

  const getFriendList = useCallback(async () => {
    if (!user) {
      setDialog({
        message: "로그인이 필요한 서비스입니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          navigate("/");
        },
      });
    }

    setLoading(true);

    try {
      const friends = await getFriends();

      setFriends(
        friends.filter(
          (friend) => String(friend.userId) !== String(user!.userId)
        )
      );
    } catch (e) {
      console.log(e);

      setDialog({
        message: "친구목록을 불러올 수 없습니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          navigate(-1);
        },
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getFriendList();
  }, [getFriendList]);

  const handleClickBackButton = useCallback(() => {
    navigate(`/tree/${user?.userId}`);
  }, [user]);

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
        </div>
      </div>

      {dialog && (
        <SimpleDialog
          message={dialog.message}
          positiveLabel={dialog.positiveLabel}
          onClickPositive={dialog.onClickPositive}
        />
      )}
      {isLoading && <Spinner />}
    </div>
  );
}
