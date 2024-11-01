import styles from '@/styles/PopUp.module.css';

function PopUp({ error, setError }) {
	return (
		<div className={[styles.popUpWrapper, error ? '' : styles.none].join(' ')}>
			<div className={styles.popUpContainer}>
				<div className={styles.popUpText}>{error?.message}</div>
				<button
					type="button"
					className={styles.popUpCloseButton}
					onClick={() => setError(null)}
				>
					닫기
				</button>
			</div>
		</div>
	);
}

export default PopUp;
