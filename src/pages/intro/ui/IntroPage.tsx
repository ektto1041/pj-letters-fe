import { MainButton, MainInput, TextButton } from "@/shared";
import styles from "./IntroPage.module.css";
import TreeImg from "@assets/tree.svg";
import { Header, SignupModal } from "@/widgets";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import EmailImg from "@assets/email.svg";
import LockImg from "@assets/lock.svg";
import { useNavigate } from "react-router-dom";
import { login, LoginReqDto, useUserState } from "@/features";

export default function IntroPage() {
  const navigate = useNavigate();

  const { setUser } = useUserState();

  const [isLoginPhase, setLoginPhase] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const handleClickLogin = useCallback(async () => {
    if (isLoginPhase) {
      // const newUser: User = {
      //   userId: "1",
      //   email: "a@a.com",
      //   name: "Park",
      //   profile: "abcd",
      // };
      // setUser(newUser);
      // navigate("/tree/1");

      const loginReqDto: LoginReqDto = {
        email,
        password,
      };

      try {
        const response = await login(loginReqDto);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    } else {
      setLoginPhase(true);
    }
  }, [isLoginPhase, setUser, email, password]);

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

  const handleOpenSignupModal = useCallback(() => {
    setSignupModalOpen(true);
  }, []);

  const handleCloseSignupModal = useCallback(() => {
    setSignupModalOpen(false);
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
              type="email"
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
            <TextButton onClick={handleOpenSignupModal}>
              회원가입하기
            </TextButton>
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

      {isSignupModalOpen && <SignupModal onClose={handleCloseSignupModal} />}
    </div>
  );
}
