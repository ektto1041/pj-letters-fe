import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import styles from "./NewCardPage.module.css";
import { cardImgs, createLetter, LetterBase, NewLetter } from "@/features";
import { Editor, SimpleDialog, SimpleDialogProps } from "@/widgets";
import { CheckBox, MainButton, Spinner } from "@/shared";
import { useNavigate, useParams } from "react-router-dom";

type NewCardPhase = "img" | "title";

export default function NewCardPage() {
  const { userId, treeId } = useParams();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<NewCardPhase>("title");
  const [selectedImg, setSelectedImg] = useState(0);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [isPrivate, setPrivate] = useState(false);
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);
  const [isLoading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      phase === "title" && nickname.trim().length > 0 && title.trim().length > 0
    );
  }, [phase, nickname, title]);

  const handleClose = useCallback(() => {
    setDialog({
      message: "작성한 편지가 사라집니다. 정말 나가시겠습니까?",
      positiveLabel: "나가기",
      negativeLabel: "취소",
      onClickPositive: () => {
        navigate(`/tree/${userId}`);
      },
      onClickNegative: () => {
        setDialog(null);
      },
    });
  }, [userId]);

  const handleClickSelectedImg = useCallback(() => {
    setPhase("img");
  }, []);

  const handleClickCardImg = useCallback((cardIdx: number) => {
    setSelectedImg(cardIdx);
    setPhase("title");
  }, []);

  const handleChangeNickname: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setNickname(e.target.value);
    }, []);

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleCheckPrivate = useCallback((value: boolean) => {
    setPrivate(value);
  }, []);

  const submitLetter = useCallback(async () => {
    if (!treeId) return;

    const newLetter: NewLetter = {
      title,
      content,
      sticker: selectedImg,
      name: nickname,
      treeId: parseInt(treeId),
      visible: !isPrivate,
    };

    setLoading(true);

    try {
      await createLetter(newLetter);

      setDialog({
        message: "작성이 완료되었습니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          navigate(`/tree/${userId}`);
        },
      });
    } catch (e) {
      console.log(e);

      setDialog({
        message: "작성에 실패했습니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          setDialog(null);
        },
      });
    } finally {
      setLoading(false);
    }
  }, [userId, title, content, selectedImg, nickname, treeId, isPrivate]);

  const handleClickSubmit = useCallback(() => {
    setDialog({
      message:
        "한 번 작성한 편지는 수정하거나 삭제할 수 없습니다. 전송하시겠습니까?",
      positiveLabel: "전송",
      negativeLabel: "취소",
      onClickPositive: () => {
        setDialog(null);
        submitLetter();
      },
      onClickNegative: () => {
        setDialog(null);
      },
    });
  }, [submitLetter]);

  return (
    <LetterBase onClose={handleClose}>
      <div
        className={styles["selected-img-wrapper"]}
        onClick={handleClickSelectedImg}
      >
        <img src={cardImgs[selectedImg]} alt="SelectedCardImg" />
        {phase === "img" && (
          <div className={styles["img-box-wrapper"]}>
            <div className={styles["img-box"]}>
              {cardImgs.map((cardImg, i) => (
                <div
                  key={i}
                  className={styles["card-img-wrapper"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickCardImg(i);
                  }}
                >
                  <img src={cardImg} alt="CardImg" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <input
        type="text"
        className={`${styles.title} text-md`}
        placeholder="제목을 입력하세요"
        disabled={phase === "img"}
        value={title}
        onChange={handleChangeTitle}
        maxLength={50}
      />
      <div className={styles["editor-wrapper"]}>
        <Editor onChange={handleChangeContent} defaultContent="<p></p>" />
      </div>
      <div className={styles["writer-wrapper"]}>
        <div className={styles["check-box-wrapper"]}>
          <CheckBox
            label="비밀 메시지"
            value={isPrivate}
            onChange={handleCheckPrivate}
          />
        </div>
        <input
          type="text"
          className={`${styles.nickname} text-sm`}
          placeholder="보낸이를 입력하세요"
          disabled={phase === "img"}
          value={nickname}
          onChange={handleChangeNickname}
          maxLength={20}
        />
      </div>
      <div className={styles["submit-wrapper"]}>
        <MainButton
          color="primary"
          onClick={handleClickSubmit}
          disabled={!canSubmit}
        >
          전송
        </MainButton>
      </div>

      {dialog && (
        <SimpleDialog
          message={dialog.message}
          positiveLabel={dialog.positiveLabel}
          negativeLabel={dialog.negativeLabel}
          onClickPositive={dialog.onClickPositive}
          onClickNegative={dialog.onClickNegative}
        />
      )}
      {isLoading && <Spinner />}
    </LetterBase>
  );
}
