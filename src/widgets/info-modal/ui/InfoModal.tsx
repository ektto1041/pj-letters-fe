import { FullModal } from "@/widgets/full-modal";
import styles from "./InfoModal.module.css";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import LockImg from "@assets/lock.svg";
import { MainButton, MainInput } from "@/shared";

interface InfoModalProps {
  onClose: () => void;
}

export default function InfoModal({ onClose }: InfoModalProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

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

  const handleClickNext = useCallback(() => {}, []);

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
            maxLength={12}
            disabled={isLoading}
            onChange={handleChangePassword}
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
            maxLength={12}
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
    </FullModal>
  );
}
