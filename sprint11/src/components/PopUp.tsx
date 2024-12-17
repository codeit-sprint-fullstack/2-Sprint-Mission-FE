import styles from '@/styles/LogInPage.module.css';
import Image from 'next/image';

interface Props {
  error: {
    message: string;
    onClose?: () => void;
  } | {
    name: string;
    description: string;
    price: string;
    tags: string[];
    images: string[];
    onClose?: () => void;
  } | null;
  setError: (err: null) => void;
}

function PopUp({ error, setError }: Props) {
  return (
    <div id="popup-container" className={[styles.popup_container, (error ? "" : styles.none)].join(" ")}>
      <div id="popup" className={styles.popup}>
        <div id="popup-text" className={styles.popup_text}>
          {error && 'message' in error ?
          error.message
          : <>{error?.name}{" : "}{error?.description}<br/>{error?.price}{" :: "}{error?.tags?.join("/")}<br/><Image width={50} height={50} className={styles.popup_img} src={error?.images?.[0] as string} alt={error?.name as string}/></>}
        </div><button id="popup-button-ok" className={styles.popup_button_ok} onClick={() => {
          error?.onClose?.();
          setError(null);
        }}>확인</button>
      </div>
    </div>
  );
}

export default PopUp;
