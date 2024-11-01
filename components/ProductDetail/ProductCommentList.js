import styles from './ProductCommentList.module.css';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import formatTime from '@/lib/formatTime';

export default function ProductCommentList({ productComments = [] }) {
  const [selectedComment, setSelectedComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState('');
  const [editingContent, setEditingContent] = useState('');

  //   const [dropdownOpen, setDropdownOpen] = useState(false);
  //   const dropdownRef = useRef(null);

  const router = useRouter();
  const productId = router.query['id'];

  //   const handleMenuClick = (comment) => {
  //     setSelectedComment(comment);
  //     setDropdownOpen((prev) => !prev);
  //   };

  //   const handleEditClick = (comment) => {
  //     setEditingCommentId(comment.id);
  //     setEditingContent(comment.content);
  //     setDropdownOpen(false);
  //   };

  //   const handleEdit = async (commentId) => {
  //     try {
  //       await patchArticleComment(articleId, commentId, {
  //         content: editingContent
  //       });
  //       setEditingCommentId(null);
  //       window.location.reload();
  //     } catch (err) {
  //       console.error('댓글 수정 중 오류 발생:', err);
  //     }
  //   };

  return (
    <div>
      {productComments && productComments.length > 0 ? (
        <ul className={styles[`comment-list`]}>
          {productComments.map((comment) => (
            <li className={styles.container} key={comment.id}>
              <div className={styles.content}>
                {editingCommentId === comment.id ? (
                  <div className={styles.edit}>
                    <textarea
                      type="text"
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
                      {/* {selectedComment?.id === comment.id && dropdownOpen && (
                        <div ref={dropdownRef} className={styles.dropdown}>
                          <CommentDropdown
                            commentId={comment.id}
                            onEditClick={() => handleEditClick(comment)}
                          />
                        </div>
                      )} */}
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
                  <p>귀여운판다</p>
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
