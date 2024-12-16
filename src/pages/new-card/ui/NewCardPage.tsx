import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import styles from "./NewCardPage.module.css";
import { cardImgs, LetterBase } from "@/features";
import { Editor } from "@/widgets";
import { MainButton } from "@/shared";
import { useNavigate, useParams } from "react-router-dom";

type NewCardPhase = "img" | "title";

export default function NewCardPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<NewCardPhase>("title");
  const [selectedImg, setSelectedImg] = useState(0);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("<p></p>");

  const canSubmit = useMemo(() => {
    return (
      phase === "title" && nickname.trim().length > 0 && title.trim().length > 0
    );
  }, [phase, nickname, title]);

  const handleClose = useCallback(() => {
    const answer = confirm("작성한 편지가 사라집니다. 정말 나가시겠습니까?");

    if (answer) {
      navigate(`/tree/${userId}`);
    }
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

  const handleClickSubmit = useCallback(() => {
    const answer = confirm(
      "한 번 작성한 편지는 수정할 수 없습니다. 전송하시겠습니까?"
    );

    if (answer) {
      navigate(`/tree/${userId}`);
    }
  }, [userId]);

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
      />
      <div className={styles["editor-wrapper"]}>
        <Editor onChange={handleChangeContent} defaultContent="<p></p>" />
      </div>
      <div className={styles["writer-wrapper"]}>
        <input
          type="text"
          className={`${styles.nickname} text-sm`}
          placeholder="보낸이를 입력하세요"
          disabled={phase === "img"}
          value={nickname}
          onChange={handleChangeNickname}
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
    </LetterBase>
  );
}
