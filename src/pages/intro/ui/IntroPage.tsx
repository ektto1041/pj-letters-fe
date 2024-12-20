import { MainButton, MainInput, Spinner, TextButton } from "@/shared";
import styles from "./IntroPage.module.css";
import TreeImg from "@assets/tree.svg";
import {
  Header,
  SignupModal,
  SimpleDialog,
  SimpleDialogProps,
} from "@/widgets";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
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
  const [isLoading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);

  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const cantLogin = useMemo(() => {
    return isLoginPhase && (!isEmailValid || password.length === 0);
  }, [isLoginPhase, isEmailValid, password]);

  const handleClickLogin = useCallback(async () => {
    if (cantLogin) return;
    if (isLoginPhase) {
      const loginReqDto: LoginReqDto = {
        username: email,
        password,
      };

      setLoading(true);

      try {
        const user = await login(loginReqDto);
        console.log(user);

        setUser(user);

        navigate(`/tree/${user.userId}`);
      } catch (e) {
        console.log(e);

        setDialog({
          message: "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
          positiveLabel: "확인",
          onClickPositive: () => {
            setDialog(null);
          },
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoginPhase(true);
    }
  }, [isLoginPhase, setUser, email, password, cantLogin]);

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

  const handleKeyDownPassword: KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        if (e.key === "Enter") {
          handleClickLogin();
        }
      },
      [handleClickLogin]
    );

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
              maxLength={30}
            />
            <MainInput
              icon={LockImg}
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleChangePassword}
              maxLength={20}
              onKeyDown={handleKeyDownPassword}
            />
            <TextButton onClick={handleOpenSignupModal}>
              회원가입하기
            </TextButton>
          </div>
          <MainButton
            color="primary"
            onClick={handleClickLogin}
            disabled={cantLogin}
          >
            로그인하기
          </MainButton>
        </div>
      </div>

      {isSignupModalOpen && <SignupModal onClose={handleCloseSignupModal} />}
      {isLoading && <Spinner />}
      {dialog && (
        <SimpleDialog
          message={dialog.message}
          positiveLabel={dialog.positiveLabel}
          onClickPositive={dialog.onClickPositive}
        />
      )}
    </div>
  );
}
