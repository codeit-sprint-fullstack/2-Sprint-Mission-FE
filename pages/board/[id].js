import styles from "./board.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditDeleteModal from "@/components/EditDeleteModal/EditDeleteModal";
import { fetchApi } from "@/utils/fetchApi";

import select from "../../images/board/select_img.svg";
import user from "../../images/board/profile_img.svg";
import like_button from "../../images/board/heart_btn.svg";
import back from "../../images/board/back_icon.svg";
import empty from "../../images/board/reply_empty.svg";
import { useRouter } from "next/router";

/** TODO
 * 1. 전체적인 이미지에 alt 넣기
 * 2. 삭제하기는 피그마에 없어서 추후 업데이트 예정
 */

export default function Board() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const fetchArticle = async () => {
    if (id) {
      try {
        const data = await fetchApi(`/articles/${id}`);
        console.log(data);
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
      await fetchApi(`/articles/${id}`, null, "DELETE");
      router.push("/board");
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

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsModalOpen(false);
    router.push("/board/edit/${id}");
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

  return (
    <>
      <div className={styles.detail_content_container}>
        <div className={styles.detail_title}>
          <h3>{article?.title}</h3>
          <Image src={select} onClick={toggleModal} />
        </div>
        <div className={styles.detail_user_stats}>
          <Image src={user} className={styles.user_img} />
          <h4 className={styles.nickname}>총명한판다</h4>
          <h4 className={styles.create_at}>2024. 01. 02</h4>
          <div className={styles.line}></div>
          <Image src={like_button} />
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
            <Image src={empty} />
            <p>아직 댓글이 없어요</p>
          </div>
        ) : (
          comment.map((comment) => (
            <>
              <div className={styles.comment_title} key={comment.id}>
                <p>{comment.content}</p>
                <Image src={select} onClick={toggleModal} />
              </div>
              <div className={styles.detail_user_stats}>
                <Image src={user} className={styles.user_img} />
                <div className={styles.comment_user_stats_content}>
                  <h5 className={styles.nickname}>총명한판다</h5>
                  <h5 className={styles.create_at}>1시간 전</h5>
                </div>
              </div>
            </>
          ))
        )}
      </div>
      <div className={styles.return_button_container}>
        <Link href={"/board"} className={styles.link_button}>
          <button className={styles.return_list}>
            목록으로 돌아가기
            <Image src={back} />
          </button>
        </Link>
      </div>
      {isModalOpen && (
        <EditDeleteModal
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}
    </>
  );
}
