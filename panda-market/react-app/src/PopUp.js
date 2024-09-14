import styles from './pages/LogInPage.module.css';

function PopUp({ error, setError }) {
	return (
		<div id="popup-container" className={[styles.popup_container, (error ? "" : styles.none)].join(" ")}>
			<div id="popup" className={styles.popup}>
				<div id="popup-text" className={styles.popup_text}>{error?.message}</div><button id="popup-button-ok" className={styles.popup_button_ok} onClick={() => {
					setError(null);
				}}>확인</button>
			</div>
		</div>
	);
}

export default PopUp;
