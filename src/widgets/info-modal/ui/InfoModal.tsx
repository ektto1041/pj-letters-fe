import { FullModal } from "@/widgets/full-modal";
import styles from "./InfoModal.module.css";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import LockImg from "@assets/lock.svg";
import { MainButton, MainInput } from "@/shared";
import { updatePassword, useUserState } from "@/features";
import { SimpleDialog, SimpleDialogProps } from "@/widgets/simple-dialog";
import { useNavigate } from "react-router-dom";

interface InfoModalProps {
  onClose: () => void;
}

export default function InfoModal({ onClose }: InfoModalProps) {
  const navigate = useNavigate();
  const { setUserNull } = useUserState();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);

  const isPasswordValid = useMemo(() => {
    return password.length >= 8;
  }, [password]);

  const isConfirmPasswordValid = useMemo(() => {
    return password === confirmPassword;
  }, [confirmPassword, password]);

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setPassword(e.target.value);
    }, []);

  const handleChangeConfirmPassword: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setConfirmPassword(e.target.value);
    }, []);

  const handleClickNext = useCallback(async () => {
    setLoading(true);

    try {
      await updatePassword(password);

      setDialog({
        message: "비밀번호가 변경되었습니다. 다시 로그인 해주세요.",
        positiveLabel: "확인",
        onClickPositive: () => {
          setDialog(null);
          navigate("/");
          setUserNull();
        },
      });
    } catch (e) {
      console.log(e);

      setDialog({
        message: "비밀번호 변경에 실패했습니다.",
        positiveLabel: "확인",
        onClickPositive: () => {
          setDialog(null);
        },
      });
    } finally {
      setLoading(false);
    }
  }, [password, setUserNull]);

  return (
    <FullModal title="비밀번호 변경" onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.description} text-sm`}>
            변경할 비밀번호를 입력해주세요.
          </div>
          <MainInput
            icon={LockImg}
            placeholder="비밀번호"
            type="password"
            value={password}
            maxLength={20}
            disabled={isLoading}
            onChange={handleChangePassword}
            autoFocus
          />
          <div
            className={`${styles.hint} text-xs ${
              isPasswordValid ? styles.hide : ""
            }`}
          >
            최소 8글자 이상 입력해주세요.
          </div>
          <MainInput
            icon={LockImg}
            placeholder="비밀번호 확인"
            type="password"
            value={confirmPassword}
            maxLength={20}
            disabled={isLoading}
            onChange={handleChangeConfirmPassword}
          />
          <div
            className={`${styles.hint} text-xs ${
              isConfirmPasswordValid || confirmPassword.length === 0
                ? styles.hide
                : ""
            }`}
          >
            비밀번호가 틀립니다.
          </div>
        </div>
        <div className={styles["nav-bar"]}>
          <MainButton
            color="primary"
            onClick={handleClickNext}
            disabled={!(isPasswordValid && isConfirmPasswordValid)}
          >
            확인
          </MainButton>
        </div>
      </div>

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
