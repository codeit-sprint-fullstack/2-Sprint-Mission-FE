import Modal from '@components/Modal';

export default function DeleteModal({ isOpen, onConfirmClick, onCancelClick }) {
  return (
    <>
      {isOpen && (
        <Modal
          buttons={[
            { Msg: '확인', onClick: onConfirmClick },
            { Msg: '취소', onClick: onCancelClick },
          ]}
        >
          정말 삭제하시겠습니까?
        </Modal>
      )}
    </>
  );
}
