import styles from '@/styles/LogInPage.module.css';
import Image from 'next/image';

function PopUp({ error, setError }) {
	return (
		<div id="popup-container" className={[styles.popup_container, (error ? "" : styles.none)].join(" ")}>
			<div id="popup" className={styles.popup}>
				<div id="popup-text" className={styles.popup_text}>
					{error && error?.message ?
					error.message
					: <>{error?.name}{" : "}{error?.description}<br/>{error?.price}{" :: "}{error?.tags?.join("/")}<br/><Image width={50} height={50} className={styles.popup_img} src={error?.images?.[0]} alt={error?.name}/></>}
				</div><button id="popup-button-ok" className={styles.popup_button_ok} onClick={() => {
					setError(null);
					error?.onClose?.();
				}}>확인</button>
			</div>
		</div>
	);
}

export default PopUp;
