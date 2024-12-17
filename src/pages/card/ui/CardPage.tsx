import { cardImgs, Letter, LetterBase, useUserState } from "@/features";
import styles from "./CardPage.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@/widgets";
import { MainButton } from "@/shared";
import { toPng } from "html-to-image";

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
      private: false,
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

    const png = await toPng(letterRef.current, {
      skipFonts: true,
    });
    const link = document.createElement("a");
    link.href = png;
    link.download = "image.png";

    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      window.open(png, "_blank");
    } else {
      link.click();
    }
  }, []);

  return (
    <LetterBase onClose={handleClose} refs={letterRef}>
      {letter !== null && (
        <>
          <div className={styles["sticker-wrapper"]}>
            <img
              src={cardImgs[letter.sticker]}
              alt="Sticker"
              crossOrigin="anonymous"
            />
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
