import CommentForm from "@/components/Comment/CommentForm";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import CommentItem from "@/components/Comment/CommentItem";
import EditDeleteModal from "@/components/EditDeleteModal/EditDeleteModal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchApi } from "@/utils/axiosInstance";
import styles from "./market.module.css";
import empty_img from "@/images/etc/Img_inquiry_empty.svg";
import back_img from "../../images/board/back_icon.svg";
import selectImage from "@/images/board/select_img.svg";
import user_img from "@/images/etc/userIcon.svg";
import Link from "next/link";
import Image from "next/image";

const fetchCommentData = async (id) => {
  if (id) {
    try {
      const data = await fetchApi(`/products/${id}/comments?limit=10`);
      return data.list || [];
    } catch (error) {
      console.error("문의댓글 가져오기 실패", error);
      return [];
    }
  }
};

export default function Market() {
  const router = useRouter();
  const { id } = router.query;

  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchComments = async () => {
      if (id) {
        const fetchedComments = await fetchCommentData(id);
        setComment(fetchedComments);
      }
    };
    fetchComments();
  }, [id]);

  const handleDeleteComment = async () => {
    try {
      await fetchApi(`/comments/${selectedCommentId}`, null, "DELETE", true);

      const updatedComments = await fetchCommentData(id);
      setComment(updatedComments);
      setIsModalOpen(false);
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
    }
  };

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;
    try {
      await fetchApi(
        `/products/${id}/comments`,
        { content: newComment },
        "POST",
        true
      );
      setNewComment("");
      const updatedComments = await fetchCommentData(id);
      setComment(updatedComments);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleEditCommentChange = (e) => setEditComment(e.target.value);

  const handleEditCommentSubmit = async () => {
    if (editComment.trim() === "") return;
    try {
      await fetchApi(
        `/comments/${editCommentId}`,
        { content: editComment },
        "PATCH"
      );
      setEditCommentId(null);
      setEditComment("");
      const updatedComments = await fetchCommentData(id);
      setComment(updatedComments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (commentId) => {
    const commentToEdit = comment.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setEditCommentId(commentId);
      setEditComment(commentToEdit.content);
      setIsModalOpen(false);
    }
  };

  const handleCancelClick = () => {
    setEditCommentId(null);
    setEditComment("");
  };

  const toggleModal = (e, commentId) => {
    const rect = e.target.getBoundingClientRect();
    setModalPosition({ top: rect.top + 5, left: rect.left - 20 });
    setIsModalOpen(true);
    setSelectedCommentId(commentId);
  };

  return (
    <>
      <ProductDetails productId={id} />
      <CommentForm
        newComment={newComment}
        onCommentChange={handleCommentChange}
        onCommentSubmit={handleCommentSubmit}
        isInquiry={true}
      />

      <div className={styles.comment_container}>
        {comment.length === 0 ? (
          <div className={styles.empty_comment}>
            <Image src={empty_img} alt="빈 이미지" />
            <p>아직 문의가 없어요</p>
          </div>
        ) : (
          comment.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              editCommentId={editCommentId}
              editComment={editComment}
              handleEditCommentChange={handleEditCommentChange}
              handleEditCommentSubmit={handleEditCommentSubmit}
              toggleModal={toggleModal}
              userImage={user_img}
              selectImage={selectImage}
              handleEditClick={handleEditClick}
              handleCancelClick={handleCancelClick}
            />
          ))
        )}
      </div>
      <div className={styles.return_button_container}>
        <Link href="/items">
          <button className={styles.return_list}>
            목록으로 돌아가기
            <Image src={back_img} alt="목록으로 돌아가기" />
          </button>
        </Link>
      </div>
      {isModalOpen && (
        <EditDeleteModal
          onDelete={handleDeleteComment}
          onEdit={() => handleEditClick(selectedCommentId)}
          style={{
            position: "absolute",
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        />
      )}
    </>
  );
}
