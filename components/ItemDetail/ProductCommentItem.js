import Image from 'next/image';
import { useState } from 'react';
import styles from './ProductCommentItem.module.css';
import formatTimeAgo from '@/lib/formatTimeAgo';
import Dropdown from '@/components/Common/Dropdown';
import { deleteProductComment } from '@/lib/api/ProductService';
import ModalConfirm from '../Common/ModalConfirm';
import { useAuth } from '@/contexts/AuthProvider';

export default function ProductCommentItem({ comment, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useAuth();

  const handleDelete = async () => {

    setIsDeleting(true);
    try {
      await deleteProductComment(comment.id);
      onDelete(comment.id);
    } catch (error) {
      alert('댓글 삭제에 실패했습니다.');
      console.error(error);
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false); // 모달 닫기
    }
  };

  const openDeleteModal = () => {
    setIsModalOpen(true); // 삭제 모달 열기
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // 삭제 모달 닫기
  };


  const handleEdit = () => {
    onEdit(comment); // 수정할 댓글 정보를 상위 컴포넌트로 전달
  };

  return (
    <div className={styles.commentItem}>
      <p className={styles.commentContent}>{comment.content}</p>
      <div className={styles.commentInfo}>
        <div className={styles.profileIcon}>
          <Image 
            src="/images/user_profile.png" 
            alt="프로필 이미지" 
            fill 
            sizes="2.4rem" 
          />
        </div>
        <div className={styles.nicknameAndDate}>
          <span className={styles.nickname}>{comment.writer.nickname || '익명'}</span>
          <span className={styles.date}>{formatTimeAgo(comment.createdAt)}</span>
        </div>
        {/* 드롭다운 메뉴 */}
        <div className={styles.dropdownContainer}>
          <Dropdown
            name="commentOptions"
            iconMode={true}
            options={[
              { label: '수정하기', value: 'edit' },
              { label: '삭제하기', value: 'delete' }
            ]}
            value=""
            onChange={(name, value) => {
              if (value === 'delete') openDeleteModal();
              if (value === 'edit') handleEdit();
            }}
          />
        </div>
      </div>
      {isDeleting && <p className={styles.deletingText}>삭제 중...</p>}
       {/* ModalConfirm 추가 */}
       <ModalConfirm
        isOpen={isModalOpen}
        onConfirm={handleDelete}  
        onCancel={closeDeleteModal}  
        message="정말로 댓글을 삭제하시겠습니까?"
      />     
    </div>
  );
}
