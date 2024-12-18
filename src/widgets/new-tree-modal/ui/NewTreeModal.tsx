import { FullModal } from "@/widgets/full-modal";
import styles from "./NewTreeModal.module.css";
import { MainButton, MainInput, Spinner } from "@/shared";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import XmasTreeImg from "@assets/xmas-tree.png";
import { createTree } from "@/features";
import { SimpleDialog, SimpleDialogProps } from "@/widgets/simple-dialog";
import { useNavigate } from "react-router-dom";

export default function NewTreeModal() {
  const navigate = useNavigate();

  const [treeName, setTreeName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);

  const isTreeNameValid = useMemo(() => {
    return treeName.trim().length > 1;
  }, [treeName]);

  const handleChangeTreeName: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setTreeName(e.target.value);
    }, []);

  const handleClickSubmit = useCallback(async () => {
    setLoading(true);

    try {
      await createTree(treeName);

      navigate(0);
    } catch (e) {
      console.log(e);

      setDialog({
        message: "트리 생성에 실패했습니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          setDialog(null);
        },
      });
    } finally {
      setLoading(false);
    }
  }, [treeName]);

  return (
    <FullModal title="나의 트리 생성">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.description} text-sm`}>
            나의 트리 이름을 입력해주세요.
          </div>
          <MainInput
            icon={XmasTreeImg}
            placeholder="트리 이름"
            type="text"
            value={treeName}
            maxLength={12}
            onChange={handleChangeTreeName}
          />
          <div
            className={`${styles.hint} text-xs ${
              isTreeNameValid ? styles.hide : ""
            }`}
          >
            최소 2글자 이상 입력해주세요.
          </div>
        </div>
        <div className={styles["nav-bar"]}>
          <MainButton
            color="primary"
            onClick={handleClickSubmit}
            disabled={!isTreeNameValid}
          >
            확인
          </MainButton>
        </div>
      </div>

      {isLoading && <Spinner />}
      {dialog && (
        <SimpleDialog
          message={dialog.message}
          positiveLabel={dialog.positiveLabel}
          onClickPositive={dialog.onClickPositive}
        />
      )}
    </FullModal>
  );
}
