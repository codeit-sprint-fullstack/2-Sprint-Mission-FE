import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './LogInPage.module.css';
import { useSetUser, useUser } from '../context/UserProvider.jsx';
import PopUp from '../components/PopUp.jsx';

function Profile() {
	const [error, setError] = useState(null);
	const user = useUser();
	const setUser = useSetUser();

	const handleLogout = e => {
		try {
			localStorage.clear();
			setUser(null);
		} catch (err) {
			setError(err);
		}
	};

	return (
		<>
			{!user && !error && <Navigate to="/login" />}
			<section className={styles.section}>
				<Link to="/">
					<img className={styles.logo} src="/images/Property-1=lg.png" alt="판다마켓 로고" />
				</Link>
				<div className={styles.profileElements}>
					<div className={styles.profileElement}>
						<h3>닉네임</h3>
						<p>{user?.nickname}</p>
					</div>
				</div>
				<button className={styles.logout} type="button" onClick={handleLogout}>
					로그아웃
				</button>
				<PopUp error={error} setError={setError} />
			</section>
		</>
	);
}

export default Profile;
