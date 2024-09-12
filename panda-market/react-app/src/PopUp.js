import styles from './pages/LogInPage.module.css';

function PopUp() {
	return (
		<div id="popup-container" className={[styles.popup_container, styles.none].join(" ")}>
			<div id="popup" className={styles.popup}>
				<div id="popup-text" className={styles.popup_text}></div><button id="popup-button-ok" className={styles.popup_button_ok}>확인</button>
			</div>
		</div>
	);
}

export default PopUp;
