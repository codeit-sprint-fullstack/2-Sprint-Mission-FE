import style from './css/modal.module.css';

function Modal({ message, noButton = false }) {
  return (
    <div className={`${style.modal}`}>
      <div className={`${style['modal-content']}`}>
        <p>{message}</p>
        {!noButton && <div className={`${style.button} button`}>확인</div>}
      </div>
    </div>
  );
}

export default Modal;
