import { useState } from 'react';
import { useRouter } from 'next/router';
import Instance from "@/lib/axiosInstance";
import { useAuth } from '../hooks/useAuth';
import Modal from '../components/modal';
import styles from './login.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
    const router = useRouter();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const { user, login } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setIsButtonDisabled(!values.email || !values.password);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = values;

        try {
            const response = await Instance.post('/users/login', { email, password });
            const { accessToken } = response.data;

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
            }

            setModalMessage('로그인에 성공했습니다.');
            setIsModalOpen(true);

            await login({ email, password });
            router.push('/product');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setModalMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else {
                setModalMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
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
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputItem}>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해 주세요"
                        value={values.password}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <button type="submit" className={styles.button} disabled={isButtonDisabled}>
                    로그인
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
                판다마켓이 처음이신가요? <Link href="/signup">회원가입</Link>
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