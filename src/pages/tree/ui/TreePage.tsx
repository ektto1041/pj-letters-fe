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
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  cardGrayImgs,
  cardImgs,
  getLettersByTreeId,
  getTreeByUserId,
  LetterInTree,
  Tree,
  uploadImage,
  useUserState,
} from "@/features";
import CircleArrowLImg from "@assets/circle-arrow-l.svg";
import CircleArrowRImg from "@assets/circle-arrow-r.svg";
import { AxiosError } from "axios";
import SnowmanImg from "@assets/snowman.svg";

type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calcTime: () => Time = () => {
  const christmasDay = new Date("2024-12-24T15:00:00");

  const now = new Date();
  const difference = christmasDay.getTime() - now.getTime();

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  } else {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

export default function TreePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, setUserNull } = useUserState();

  const isMyTree = useMemo(() => {
    return String(userId) === String(user?.userId);
  }, [userId, user]);

  const [timeLeft, setTimeLeft] = useState<Time>(calcTime());
  const isXmas = useMemo(() => {
    return (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    );
  }, [timeLeft]);

  const [tree, setTree] = useState<Tree | null>(null);
  const [letters, setLetters] = useState<LetterInTree[]>([]);
  const [page, setPage] = useState(0);
  const [isMyInfoModalOpen, setMyInfoModalOpen] = useState(false);
  const [isNewTreeModalOpen, setNewTreeModalOpen] = useState(false);
  const [isUpdateTreeModalOpen, setUpdateTreeModalOpen] = useState(false);
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);
  const [isLoading, setLoading] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const hasNextPage = useMemo(() => {
    const lettersCount = letters.length;
    const nextPageFirstIdx = 5 * page + 5;

    return lettersCount > nextPageFirstIdx;
  }, [letters, page]);

  const timeLeftStr = useMemo(() => {
    return `${timeLeft.days}일 ${timeLeft.hours}시간 ${timeLeft.minutes}분 ${timeLeft.seconds}초`;
  }, [timeLeft]);

  const setTimer = () => {
    const christmasDay = new Date("2024-12-24T15:00:00");

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
      if (hasNoTree && isMyTree) {
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
  }, [user, userId, isMyTree]);

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
    navigate(`/new-card/${userId}/${tree?.treeId}`);
  }, [userId, tree]);

  const handleClickLetter = useCallback(
    (letterId: number, visible: boolean) => {
      if (!isMyTree && !visible) {
        setDialog({
          message: "비밀 메시지는 트리의 주인만 확인할 수 있습니다.",
          positiveLabel: "확인",
          onClickPositive: () => {
            setDialog(null);
          },
        });
      } else if (isXmas) {
        navigate(`/card/${letterId}`);
      } else {
        setDialog({
          message: "메시지는 크리스마스부터 열어볼 수 있습니다.",
          positiveLabel: "확인",
          onClickPositive: () => {
            setDialog(null);
          },
        });
      }
    },
    [isXmas, isMyTree]
  );

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

  const handleClickProfileImg = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const handleChangeProfileImg: ChangeEventHandler<HTMLInputElement> =
    useCallback(async (e) => {
      const input = e.target;
      if (input.files) {
        const file = input.files[0];

        if (file.size > 2 * 1000 * 1000) {
          setDialog({
            message: (
              <>
                2MB 이하의 이미지 파일만
                <br />
                등록할 수 있습니다.
              </>
            ),
            positiveLabel: "확인",
            onClickPositive: () => {
              setDialog(null);
            },
          });
        } else {
          const formData = new FormData();
          formData.append("images", file);

          setLoading(true);

          try {
            await uploadImage(formData);

            navigate(0);
          } catch (e) {
            console.log(e);

            setDialog({
              message: "프로필 이미지 변경에 실패했습니다.",
              positiveLabel: "확인",
              onClickPositive: () => {
                setDialog(null);
              },
            });
          } finally {
            setLoading(false);
          }
        }
      }
    }, []);

  const handleClickLogout = useCallback(() => {
    setDialog({
      message: "정말 로그아웃하시겠습니까?",
      positiveLabel: "확인",
      negativeLabel: "취소",
      onClickPositive: () => {
        navigate("/");
        setUserNull();
      },
      onClickNegative: () => {
        setDialog(null);
      },
    });
  }, [setUserNull]);

  return (
    <div className={styles.container}>
      <div className={styles.ground}>
        <div className={styles.snowman}>
          <div>
            <img src={SnowmanImg} alt="Snowman" />
            <div className={`${styles.bubble} text-sm`}>
              만든이: glow_ju_013
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <Header
          title={`${tree?.treeName || "이름 없는 트리"}`}
          onClickBackButton={isMyTree ? undefined : handleClickBackButton}
          onClickHeader={isMyTree ? handleClickHeader : undefined}
        />
        {tree && (
          <div className={styles["profile-wrapper"]}>
            <div
              className={styles["profile-img-wrapper"]}
              onClick={isMyTree ? handleClickProfileImg : undefined}
            >
              <img src={tree.profile} alt="ProfileImage" />
            </div>
            <div className={`${styles.nickname} text-md`}>{tree.nickname}</div>
          </div>
        )}
        {!isXmas && (
          <div className={styles["timer-wrapper"]}>
            <div className={`${styles.timer} text-sm`}>{timeLeftStr}</div>
          </div>
        )}
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
              onClick={() => handleClickLetter(letter.letterId, letter.visible)}
            >
              <img
                src={
                  !letter.visible
                    ? cardGrayImgs[letter.sticker]
                    : cardImgs[letter.sticker]
                }
                alt="CardImg"
              />
            </div>
          ))}
        </div>
        <div className={styles["button-box"]}>
          {isMyTree ? (
            <>
              <div className={styles["auth-button-box"]}>
                <TextButton onClick={handleClickMyInfo}>
                  비밀번호 변경
                </TextButton>
                <TextButton onClick={handleClickLogout}>로그아웃</TextButton>
              </div>

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

      <input
        ref={imageInputRef}
        className={styles.hide}
        type="file"
        accept="image/*"
        onChange={handleChangeProfileImg}
      />

      {dialog && (
        <SimpleDialog
          message={dialog.message}
          positiveLabel={dialog.positiveLabel}
          negativeLabel={dialog.negativeLabel}
          onClickPositive={dialog.onClickPositive}
          onClickNegative={dialog.onClickNegative}
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
