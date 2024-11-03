import { useState } from 'react';
import { useRouter } from 'next/router';
import Instance from "@/lib/axiosInstance";
import { useAuth } from '../hooks/useAuth';
import Modal from '../components/modal';
import styles from './signup.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Signup() {
    const router = useRouter();
    const [values, setValues] = useState({
        email: '',
        nickName: '',
        password: '',
        passwordRepeat: '',
    });
    const { user, login } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (name === 'password' || name === 'passwordRepeat') {
            const isMatching = values.password === values.passwordRepeat;
            setPasswordError(isMatching ? '' : '비밀번호가 일치하지 않습니다.');
            setIsButtonDisabled(!isMatching || !values.email || !values.nickName);
        } else {
            setIsButtonDisabled(!values.password || values.password !== values.passwordRepeat || !values.email || !values.nickName);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const { email, nickName, password, passwordRepeat } = values;
        
        if (password !== passwordRepeat) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await Instance.post('/users/signUp', { email, nickName, password });
            const { token } = response.data;
            
            if (token) {
                localStorage.setItem('token', token);
            }
            
            setModalMessage('회원가입이 완료되었습니다.');
            setIsModalOpen(true);

            await login({ email, password });
            router.push('/product');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setModalMessage('사용 중인 이메일입니다.');
            } else {
                setModalMessage('회원가입 중 오류가 발생했습니다');
            }
            setIsModalOpen(true);
        }
    }

    if (user) {
        router.push('/product');
        return null;
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.authContainer}>
            <Link href="/" aria-label="홈으로 이동" className={styles.logoHomeLink}>
                <Image src="/panda.png" alt="판다마켓 로고" width={396} height={132} />
            </Link>

            <form onSubmit={handleSubmit}>
                <div className={styles.inputItem}>
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해 주세요"
                        value={values.email}
                        onChange={handleChange}
                        required
                        className={`${styles.input} ${styles.passwordInput}`}
                    />
                    {passwordError && <span className={styles.errorMessage}>이메일을 입력해 주세요</span>}
                </div>

                <div className={styles.inputItem}>
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        id="nickname"
                        name="nickName"
                        type="text"
                        placeholder="닉네임을 입력해 주세요"
                        value={values.nickName}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.passwordInput}`}
                    />
                    {passwordError && <span className={styles.errorMessage}>닉네임을 입력해 주세요</span>}
                </div>

                <div className={styles.inputItem}>
                    <label htmlFor="password">비밀번호</label>
                    <div className={styles.inputWrapper}>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="비밀번호를 입력해 주세요"
                            value={values.password}
                            onChange={handleChange}
                            className={`${styles.input} ${styles.passwordInput}`}
                        />
                    </div>
                    {passwordError && (
                        <span className={styles.errorMessage}>비밀번호를 8자 이상 입력해 주세요</span>
                    )}
                </div>

                <div className={styles.inputItem}>
                    <label htmlFor="passwordConfirmation">비밀번호 확인</label>
                    <div className={styles.inputWrapper}>
                        <input
                            id="passwordConfirmation"
                            name="passwordRepeat"
                            type="password"
                            placeholder="비밀번호를 다시 한 번 입력해 주세요"
                            value={values.passwordRepeat}
                            onChange={handleChange}
                            className={`${styles.input} ${styles.passwordInput}`}
                        />
                    </div>
                    {passwordError && (
                        <span className={styles.errorMessage}>비밀번호가 일치하지 않습니다</span>
                    )}
                </div>

                <button type="submit" className={styles.button} disabled={isButtonDisabled}>
                    회원가입
                </button>
            </form>

            <div className={styles.socialLoginContainer}>
                <h3>간편 로그인하기</h3>
                <div className={styles.socialLoginLinksContainer}>
                    <Link href="https://www.google.com/" target="_blank" rel="noopener noreferrer" aria-label="구글 로그인">
                        <Image src="/google.png" alt="구글 로그인" width={42} height={42} />
                    </Link>
                    <Link href="https://www.kakaocorp.com/page/" target="_blank" rel="noopener noreferrer" aria-label="카카오톡 로그인">
                        <Image src="/kakao.png" alt="카카오톡 로그인" width={42} height={42} />
                    </Link>
                </div>
            </div>

            <div className={styles.authSwitch}>
                이미 회원이신가요? <Link href="/login">로그인</Link>
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <p>{modalMessage}</p>
                    <button onClick={closeModal} className={styles.confirmButton}>확인</button>
                </Modal>
            )}
        </div>
    );
}