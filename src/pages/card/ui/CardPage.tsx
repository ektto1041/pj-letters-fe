import { cardImgs, getLetterById, LetterBase, LetterItem } from "@/features";
import styles from "./CardPage.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor, SimpleDialog, SimpleDialogProps } from "@/widgets";
import { MainButton, Spinner } from "@/shared";
import { toPng } from "html-to-image";

export default function CardPage() {
  const navigate = useNavigate();
  const { letterId } = useParams();

  const [letter, setLetter] = useState<LetterItem | null>(null);
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);
  const [isLoading, setLoading] = useState(false);

  const letterRef = useRef<HTMLDivElement>(null);

  const getLetter = useCallback(async (letterId: string) => {
    setLoading(true);

    try {
      const letter = await getLetterById(parseInt(letterId));

      setLetter(letter);
    } catch (e) {
      console.log(e);

      setDialog({
        message: "비정상적인 접근입니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          navigate(-1);
        },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (letterId) {
      getLetter(letterId);
    } else {
      setDialog({
        message: "비정상적인 접근입니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          navigate("/");
        },
      });
    }
  }, [letterId]);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, []);

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

      {dialog && (
        <SimpleDialog
          message={dialog.message}
          positiveLabel={dialog.positiveLabel}
          onClickPositive={dialog.onClickPositive}
        />
      )}
      {isLoading && <Spinner />}
    </LetterBase>
  );
}
