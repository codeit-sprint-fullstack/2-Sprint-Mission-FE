import "../page/HomeStyle/modal.css";

interface ModalProps {
  message: string;
  onClose: () => void;
}

export default function Modal({ message, onClose }: ModalProps) {
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
