import styles from "./styles/detail.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditDeleteModal from "@/components/EditDeleteModal/EditDeleteModal";
import { fetchApi } from "@/utils/fetchApi";

import select from "../../images/board/select_img.svg";
import user from "../../images/board/profile_img.svg";
import like_button from "../../images/board/heart_btn.svg";
import back from "../../images/board/back_icon.svg";
import empty_img from "../../images/board/reply_empty.svg";
import { useRouter } from "next/router";
import CommentItem from "@/components/CommentItem/CommentItem";

export default function Board() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editComment, setEditComment] = useState("");

  const fetchArticle = async () => {
    if (id) {
      try {
        const data = await fetchApi(`/articles/${id}`);
        setArticle(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchComments = async () => {
    if (id) {
      try {
        const data = await fetchApi(`/articles/${id}/comments`);
        setComment(data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDeleteClick = async () => {
    try {
      if (isCommentModal && selectedCommentId) {
        await fetchApi(
          `/articles/${id}/comments/${selectedCommentId}`,
          null,
          "DELETE"
        );
        fetchComments();
      } else {
        await fetchApi(`/articles/${id}`, null, "DELETE");
        router.push("/board");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, [id]);

  useEffect(() => {
    setIsButtonEnabled(newComment.trim() !== "");
  }, [newComment]);

  const toggleModal = (e, isComment = false, commentId = null) => {
    const rect = e.target.getBoundingClientRect();
    setModalPosition({ top: rect.top + 25, left: rect.left - 130 });
    setIsModalOpen((prev) => !prev);
    setIsCommentModal(isComment);
    setSelectedCommentId(commentId);
  };

  const handleEditClick = () => {
    setIsModalOpen(false);

    if (isCommentModal && selectedCommentId) {
      setEditCommentId(selectedCommentId);
      const commentToEdit = comment.find(
        (comment) => comment.id === selectedCommentId
      );
      if (commentToEdit) {
        setEditComment(commentToEdit.content);
      }
    } else {
      router.push(`/board/edit/${id}`);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;
    try {
      await fetchApi(
        `/articles/${id}/comments`,
        {
          content: newComment,
        },
        "POST"
      );
      setNewComment("");
      fetchComments();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditCommentChange = (e) => {
    setEditComment(e.target.value);
  };

  const handleEditCommentSubmit = async () => {
    if (editComment.trim() === "") return;
    try {
      const response = await fetchApi(
        `/articles/${id}/comments/${editCommentId}`,
        { content: editComment },
        "PATCH"
      );
      setEditCommentId(null);
      setEditComment("");
      await fetchComments();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className={styles.detail_content_container}>
        <div className={styles.detail_title}>
          <h3>{article?.title}</h3>
          <Image
            src={select}
            alt="선택"
            onClick={toggleModal}
            className={styles.select_button}
          />
        </div>
        <div className={styles.detail_user_stats}>
          <Image src={user} alt="유저이미지" className={styles.user_img} />
          <h4 className={styles.nickname}>총명한판다</h4>
          <h4 className={styles.create_at}>2024. 01. 02</h4>
          <div className={styles.line}></div>
          <Image src={like_button} alt="좋아요버튼" />
        </div>
        <div className={styles.post_content}>
          <p>{article?.content}</p>
        </div>
      </div>
      <div className={styles.comment_register_container}>
        <h4>댓글달기</h4>
        <textarea
          placeholder="댓글을 입력해주세요."
          className={styles.comment_textarea}
          value={newComment}
          onChange={handleCommentChange}
        ></textarea>
        <div className={styles.buttion_container}>
          <button
            className={`${styles.register_buttion} ${
              isButtonEnabled ? styles.active_button : ""
            }`}
            onClick={handleCommentSubmit}
            disabled={!isButtonEnabled}
          >
            등록
          </button>
        </div>
      </div>

      <div className={styles.comment_container}>
        {comment.length === 0 ? (
          <div className={styles.empty_comment}>
            <Image src={empty_img} alt="빈 이미지" />
            <p>아직 댓글이 없어요,</p>
            <p>지금 댓글을 달아보세요!</p>
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
              userImage={user}
              selectImage={select}
            />
          ))
        )}
      </div>
      <div className={styles.return_button_container}>
        <Link href={"/board"} className={styles.link_button}>
          <button className={styles.return_list}>
            목록으로 돌아가기
            <Image src={back} alt="목록으로 돌아가기" />
          </button>
        </Link>
      </div>
      {isModalOpen && (
        <EditDeleteModal
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
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
