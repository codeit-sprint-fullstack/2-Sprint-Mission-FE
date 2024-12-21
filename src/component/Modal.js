import "../page/HomeStyle/modal.css";

export default function Modal({ message, onClose }) {
  return (
    <div id="error-modal" className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button
          onClick={onClose}
          id="confirm-button"
          className="confirm-button"
        >
          확인
        </button>
      </div>
    </div>
  );
}
