import styles from './ProductCommentList.module.css';
import Image from 'next/image';
import { useState } from 'react';
import formatTime from '@/lib/utils/formatTime';
import { patchProductComment } from '@/lib/api/ProductService';
import ProductCommentDropdown from './\bProductCommentDropdown';
import { Comment } from '@/types/type';

interface ProductCommentListProps {
  productComments: Comment[];
}

export default function ProductCommentList({
  productComments
}: ProductCommentListProps) {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleMenuClick = (comment: Comment) => {
    setSelectedComment(comment);
    setDropdownOpen((prev) => !prev);
  };

  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
    setDropdownOpen(false);
  };

  const handleEdit = async (commentId: number) => {
    try {
      await patchProductComment(commentId, editingContent);
      setEditingCommentId(null);
      window.location.reload();
    } catch (err) {
      console.error('댓글 수정 중 오류 발생:', err);
    }
  };

  return (
    <div>
      {productComments && productComments.length > 0 ? (
        <ul className={styles[`comment-list`]}>
          {productComments.map((comment: Comment) => (
            <li className={styles.container} key={comment.id}>
              <div className={styles.content}>
                {editingCommentId === comment.id ? (
                  <div className={styles.edit}>
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                    <div className={styles.buttons}>
                      <button onClick={() => handleEdit(comment.id)}>
                        완료
                      </button>
                      <button onClick={() => setEditingCommentId(null)}>
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p>{comment.content}</p>
                    <div className={styles.menu}>
                      <Image
                        src="/images/ic_kebab.png"
                        width={24}
                        height={24}
                        onClick={() => handleMenuClick(comment)}
                        alt="메뉴 아이콘"
                      />
                      {selectedComment?.id === comment.id && dropdownOpen && (
                        <div className={styles.dropdown}>
                          <ProductCommentDropdown
                            commentId={comment.id}
                            comment={comment}
                            onEditClick={() => handleEditClick(comment)}
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className={styles.info}>
                <Image
                  src="/images/size=large.png"
                  width={32}
                  height={32}
                  alt="유저 아이콘"
                />
                <div className={styles.user}>
                  <p>{comment.writer.nickname}</p>
                  <p>{formatTime(comment.createdAt)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.null}>
          <Image
            src="/images/Property 1=sm@3x-1.png"
            width={140}
            height={140}
            alt="댓글 없을 때 아이콘"
            priority
          />
          <p>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      )}
    </div>
  );
}
