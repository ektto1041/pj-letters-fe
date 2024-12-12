import { MainButton, MainInput } from "@/shared";
import styles from "./IntroPage.module.css";
import TreeImg from "@assets/tree.svg";
import { Header } from "@/widgets";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import EmailImg from "@assets/email.svg";
import LockImg from "@assets/lock.svg";
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();

  const [isLoginPhase, setLoginPhase] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const handleClickLogin = useCallback(() => {
    if (isLoginPhase) {
      navigate("/tree/1");
    } else {
      setLoginPhase(true);
    }
  }, [isLoginPhase]);

  const handleClickBackButton = useCallback(() => {
    setEmail("");
    setPassword("");
    setLoginPhase(false);
  }, []);

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    []
  );

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setPassword(e.target.value);
    }, []);

  return (
    <div className={styles.container}>
      <div
        className={`
          ${styles.header}
          ${isLoginPhase ? styles["login-phase"] : ""}
        `}
      >
        <Header title="처음으로" onClickBackButton={handleClickBackButton} />
      </div>
      <div className={styles.content}>
        <div className={styles["img-wrapper"]}>
          <img src={TreeImg} alt="tree" />
        </div>
        <div className={styles["bottom-box"]}>
          <div
            className={`
            ${styles["input-box"]}
            ${isLoginPhase ? styles["login-phase"] : ""}
          `}
          >
            <MainInput
              icon={EmailImg}
              placeholder="Email"
              value={email}
              onChange={handleChangeEmail}
            />
            <MainInput
              icon={LockImg}
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleChangePassword}
              maxLength={8}
            />
          </div>
          <MainButton
            color="primary"
            onClick={handleClickLogin}
            disabled={isLoginPhase && (!isEmailValid || password.length === 0)}
          >
            로그인하기
          </MainButton>
        </div>
      </div>
    </div>
  );
}
