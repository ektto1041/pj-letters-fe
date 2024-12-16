import { MainButton, MainInput } from "@/shared";
import styles from "./SignupModal.module.css";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { FullModal } from "@/widgets/full-modal";
import EmailImg from "@assets/email.svg";
import KeyImg from "@assets/key.svg";
import LockImg from "@assets/lock.svg";
import AccountImg from "@assets/account.svg";
import { useNavigate } from "react-router-dom";

interface SingupModalProps {
  onClose: () => void;
}

type SignupPhase =
  | "email"
  | "checkingEmail"
  | "authCode"
  | "checkingAuthCode"
  | "extra"
  | "signup";

export default function SignupModal({ onClose }: SingupModalProps) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [phase, setPhase] = useState<SignupPhase>("email");

  const [email, setEmail] = useState("");
  const [authKey, setAuthKey] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const isPasswordValid = useMemo(() => {
    return password.length >= 8;
  }, [password]);

  const isConfirmPasswordValid = useMemo(() => {
    return password === confirmPassword;
  }, [confirmPassword, password]);

  const canNext = useMemo(() => {
    return (
      (phase === "email" && isEmailValid) ||
      (phase === "authCode" && authKey.length === 6) ||
      (phase === "extra" &&
        name.length >= 3 &&
        isPasswordValid &&
        isConfirmPasswordValid)
    );
  }, [
    phase,
    isEmailValid,
    authKey,
    name,
    isPasswordValid,
    isConfirmPasswordValid,
  ]);

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    []
  );

  const handleChangeAuthKey: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setAuthKey(e.target.value);
    },
    []
  );

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setName(e.target.value);
    },
    []
  );

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setPassword(e.target.value);
    }, []);

  const handleChangeConfirmPassword: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setConfirmPassword(e.target.value);
    }, []);

  const handleClickNext = useCallback(() => {
    if (phase === "email") {
      setPhase("checkingEmail");
      // Send Code
      if (true) {
        setPhase("authCode");
        setPage(1);
      } else {
        alert("메일 전송에 실패했습니다. 이메일을 확인해주세요.");
        setPhase("email");
      }
    } else if (phase === "authCode") {
      setPhase("checkingAuthCode");
      // Send Code
      if (true) {
        setPhase("extra");
        setPage(2);
      } else {
        alert("인증 코드가 틀립니다. 다시 시도해주세요.");
        setPhase("authCode");
      }
    } else if (phase === "extra") {
      setPhase("signup");
      // send API
      if (true) {
        alert("회원가입에 성공했습니다.");
        navigate(0);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  }, [phase]);

  return (
    <FullModal title="회원가입" onClose={onClose}>
      <div className={styles.container}>
        <div className={styles["contents-box"]}>
          <div className={`${styles.contents} ${styles[`p${page}`]}`}>
            <div className={`${styles.content} ${styles.p0}`}>
              <div className={styles["inner-content"]}>
                <div className={`${styles.description} text-sm`}>
                  사용 가능한 이메일을 입력해주세요.
                  <br />
                  이메일 인증에 활용됩니다.
                </div>
                <MainInput
                  icon={EmailImg}
                  placeholder="Email"
                  type="email"
                  value={email}
                  disabled={phase !== "email"}
                  onChange={handleChangeEmail}
                />
              </div>
            </div>
            <div className={`${styles.content} ${styles.p1}`}>
              <div className={styles["inner-content"]}>
                <div className={`${styles.description} text-sm`}>
                  입력하신 이메일로 인증코드가 발송되었습니다.
                  <br />
                  인증코드를 입력해주세요
                </div>
                <MainInput
                  icon={KeyImg}
                  placeholder="인증코드"
                  type="text"
                  value={authKey}
                  maxLength={6}
                  disabled={phase !== "authCode"}
                  onChange={handleChangeAuthKey}
                />
              </div>
            </div>
            <div className={`${styles.content} ${styles.p2}`}>
              <div className={styles["inner-content"]}>
                <div className={`${styles.description} text-md`}>
                  이메일 인증이 완료되었습니다!
                </div>
                <div className={`${styles.description} text-sm`}>
                  이제 남은 정보를 입력해주세요.
                </div>
                <MainInput
                  icon={AccountImg}
                  placeholder="이름 (본명)"
                  type="text"
                  value={name}
                  maxLength={3}
                  disabled={phase !== "extra"}
                  onChange={handleChangeName}
                />
                <div className={`${styles.hint} text-xs`}></div>
                <MainInput
                  icon={LockImg}
                  placeholder="비밀번호"
                  type="password"
                  value={password}
                  maxLength={12}
                  disabled={phase !== "extra"}
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
                  disabled={phase !== "extra"}
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
            </div>
          </div>
        </div>
        <div className={styles["nav-bar"]}>
          <MainButton
            color="primary"
            onClick={handleClickNext}
            disabled={!canNext}
          >
            {phase === "extra" ? "완료" : "다음"}
          </MainButton>
        </div>
      </div>
    </FullModal>
  );
}
