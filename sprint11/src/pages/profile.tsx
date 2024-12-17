import { useState } from 'react';
import styles from '@/styles/LogInPage.module.css';
import { useSetUser, useUser } from '@/context/UserProvider.jsx';
import PopUp from '@/components/PopUp.jsx';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

function Profile() {
	const [error, setError] = useState<null | Error>(null);
	const user = useUser();
	const setUser = useSetUser();
	const router = useRouter();

	const handleLogout = () => {
		try {
			localStorage.clear();
			setUser(null);
		} catch (err) {
			if (err instanceof Error) {
				setError(err);
			}
		}
	};

	if (!user && !error) {
		return router.push('/login');
	}

	return (
		<>
			<main className={styles.main}>
				<section className={styles.section}>
					<Link href="/">
						<div className={styles.logo}><Image fill src="/images/Property-1=lg.png" alt="판다마켓 로고" /></div>
					</Link>
					<div className={styles.profileElements}>
						<div className={styles.profileElement}>
							<h3>닉네임</h3>
							<p>{user?.user?.nickname}</p>
						</div>
					</div>
					<button className={styles.logout} type="button" onClick={handleLogout}>
						로그아웃
					</button>
				</section>
			</main>
			<PopUp error={error} setError={setError} />
		</>
	);
}

export default Profile;
