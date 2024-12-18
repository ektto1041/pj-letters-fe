import { useNavigate, useParams } from "react-router-dom";
import styles from "./TreePage.module.css";
import {
  Header,
  InfoModal,
  NewTreeModal,
  SimpleDialog,
  SimpleDialogProps,
} from "@/widgets";
import TreeImg from "@assets/tree.svg";
import { MainButton, Spinner, TextButton } from "@/shared";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  cardGrayImgs,
  cardImgs,
  getLettersByTreeId,
  getTreeByUserId,
  LetterInTree,
  Tree,
  useUserState,
} from "@/features";
import CircleArrowLImg from "@assets/circle-arrow-l.svg";
import CircleArrowRImg from "@assets/circle-arrow-r.svg";
import { AxiosError } from "axios";

export default function TreePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserState();

  const isMyTree = useMemo(() => {
    return String(userId) === String(user?.userId);
  }, [userId, user]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [tree, setTree] = useState<Tree | null>(null);
  const [letters, setLetters] = useState<LetterInTree[]>([]);
  const [page, setPage] = useState(0);
  const [isMyInfoModalOpen, setMyInfoModalOpen] = useState(false);
  const [isNewTreeModalOpen, setNewTreeModalOpen] = useState(false);
  const [isUpdateTreeModalOpen, setUpdateTreeModalOpen] = useState(false);
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);
  const [isLoading, setLoading] = useState(false);

  const hasNextPage = useMemo(() => {
    const lettersCount = letters.length;
    const nextPageFirstIdx = 5 * page + 5;

    return lettersCount > nextPageFirstIdx;
  }, [letters, page]);

  const timeLeftStr = useMemo(() => {
    return `${timeLeft.days}일 ${timeLeft.hours}시간 ${timeLeft.minutes}분 ${timeLeft.seconds}초`;
  }, [timeLeft]);

  const setTimer = () => {
    const christmasDay = new Date("2024-12-25T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = christmasDay.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return timer;
  };

  const getLetters = useCallback(async () => {
    if (!user) {
      setDialog({
        message: "로그인이 필요한 서비스입니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          navigate("/");
        },
      });

      return;
    }

    if (!userId) {
      setDialog({
        message: "잘못된 접근입니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          navigate("/");
        },
      });

      return;
    }

    setLoading(true);

    try {
      const tree = await getTreeByUserId(userId);
      const letters = await getLettersByTreeId(tree.treeId);

      setTree(tree);
      setLetters(letters);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);

      const hasNoTree = error.status === 400;
      if (hasNoTree) {
        setNewTreeModalOpen(true);
      } else {
        setDialog({
          message: "트리 정보를 가져올 수 없습니다.",
          positiveLabel: "확인",
          onClickPositive: () => {
            navigate("/");
          },
        });
      }
    } finally {
      setLoading(false);
    }
  }, [user, userId]);

  useEffect(() => {
    const timer = setTimer();
    getLetters();

    return () => clearInterval(timer);
  }, [getLetters]);

  const handleClickNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const handleClickPrevPage = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  const handleClickFriendList = useCallback(() => {
    navigate("/friend-list");
  }, []);

  const handleClickBackButton = useCallback(() => {
    navigate("/friend-list");
  }, []);

  const handleClickWrite = useCallback(() => {
    navigate(`/new-card/${userId}`);
  }, [userId]);

  const handleClickLetter = useCallback((letterId: number) => {
    navigate(`/card/${letterId}`);
  }, []);

  const handleClickMyInfo = useCallback(() => {
    setMyInfoModalOpen(true);
  }, []);

  const handleCloseMyInfoModal = useCallback(() => {
    setMyInfoModalOpen(false);
  }, []);

  const handleCloseNewTreeModal = useCallback(() => {
    setNewTreeModalOpen(false);
  }, []);

  const handleCloseUpdateTreeModal = useCallback(() => {
    setUpdateTreeModalOpen(false);
  }, []);

  const handleClickHeader = useCallback(() => {
    setUpdateTreeModalOpen(true);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.ground} />
      <div className={styles.header}>
        <Header
          title={`${tree?.treeName || "이름 없는 트리"}`}
          onClickBackButton={isMyTree ? undefined : handleClickBackButton}
          onClickHeader={isMyTree ? handleClickHeader : undefined}
        />
        {tree && (
          <div className={styles["profile-wrapper"]}>
            <div className={styles["profile-img-wrapper"]}>
              <img src={tree.profile} alt="ProfileImage" />
            </div>
            <div className={`${styles.nickname} text-md`}>{tree.nickname}</div>
          </div>
        )}
        <div className={styles["timer-wrapper"]}>
          <div className={`${styles.timer} text-sm`}>{timeLeftStr}</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["arrow-button-box"]}>
          {page > 0 && (
            <button className={styles.prev} onClick={handleClickPrevPage}>
              <img src={CircleArrowLImg} alt="LeftArrowImg" />
            </button>
          )}
          {hasNextPage && (
            <button className={styles.next} onClick={handleClickNextPage}>
              <img src={CircleArrowRImg} alt="RightArrowImg" />
            </button>
          )}
        </div>
        <div className={styles["img-wrapper"]}>
          <img src={TreeImg} alt="tree" />
          {letters.slice(5 * page, 5 * page + 5).map((letter, i) => (
            <div
              className={`${styles["card-wrapper"]} ${styles[`card${i + 1}`]}`}
              key={letter.letterId}
              onClick={() => handleClickLetter(letter.letterId)}
            >
              <img
                src={
                  !letter.visible
                    ? cardGrayImgs[letter.sticker - 1]
                    : cardImgs[letter.sticker - 1]
                }
                alt="CardImg"
              />
            </div>
          ))}
        </div>
        <div className={styles["button-box"]}>
          {isMyTree ? (
            <>
              <TextButton onClick={handleClickMyInfo}>비밀번호 변경</TextButton>
              <MainButton color="primary" onClick={handleClickFriendList}>
                친구 목록
              </MainButton>
            </>
          ) : (
            <MainButton color="primary" onClick={handleClickWrite}>
              글 남기기
            </MainButton>
          )}
        </div>
      </div>

      {dialog && (
        <SimpleDialog
          message={dialog.message}
          positiveLabel={dialog.positiveLabel}
          onClickPositive={dialog.onClickPositive}
        />
      )}
      {isMyInfoModalOpen && <InfoModal onClose={handleCloseMyInfoModal} />}
      {isNewTreeModalOpen && <NewTreeModal onClose={handleCloseNewTreeModal} />}
      {isUpdateTreeModalOpen && (
        <NewTreeModal isUpdate onClose={handleCloseUpdateTreeModal} />
      )}
      {isLoading && <Spinner />}
    </div>
  );
}
