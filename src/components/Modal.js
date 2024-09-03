import '../css/modal.css';

function Modal({ message, btn = true }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        {btn && <div className="button">확인</div>}
      </div>
    </div>
  );
}

export default Modal;
