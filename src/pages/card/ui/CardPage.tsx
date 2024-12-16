import { cardImgs, Letter, LetterBase, useUserState } from "@/features";
import styles from "./CardPage.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@/widgets";
import { MainButton } from "@/shared";
import { saveAs } from "file-saver";
import domToImage from "dom-to-image-more";

export default function CardPage() {
  const navigate = useNavigate();
  const { letterId } = useParams();

  const { user } = useUserState();

  const [letter, setLetter] = useState<Letter | null>(null);

  const letterRef = useRef<HTMLDivElement>(null);

  const getLetter = useCallback(async (letterId: string) => {
    setLetter({
      letterId,
      treeId: "1",
      title: "Letter Title",
      content: "<p>This is Letter</p>",
      nickname: "Park",
      sticker: 1,
      createdAt: "2024-12-16",
    });
  }, []);

  useEffect(() => {
    if (letterId) {
      getLetter(letterId);
    } else {
      alert("비정상적인 접근입니다.");
      navigate("/");
    }
  }, [letterId]);

  const handleClose = useCallback(() => {
    navigate(`/tree/${user?.userId}`);
  }, [user]);

  const handleSave = useCallback(async () => {
    if (!letterRef.current) return;

    // const blob = await toBlob(letterRef.current);
    // if (blob !== null) {
    //   saveAs(blob, "result.png");
    // }

    const blob = await domToImage.toBlob(letterRef.current);
    if (blob !== null) {
      saveAs(blob, "result.png");
    }
  }, []);

  return (
    <LetterBase onClose={handleClose} refs={letterRef}>
      {letter !== null && (
        <>
          <div className={styles["sticker-wrapper"]}>
            <img src={cardImgs[letter.sticker]} alt="Sticker" />
          </div>
          <div className={`${styles.title} header-h4`}>{letter.title}</div>
          <div className={styles["editor-wrapper"]}>
            <Editor defaultContent={letter.content} editable={false} />
          </div>
          <div className={styles["writer-wrapper"]}>
            <div className={`${styles.nickname} text-md`}>
              from {letter.nickname}
            </div>
          </div>
          <div className={styles["button-wrapper"]}>
            <MainButton color="primary" onClick={handleSave}>
              사진으로 저장
            </MainButton>
          </div>
        </>
      )}
    </LetterBase>
  );
}
