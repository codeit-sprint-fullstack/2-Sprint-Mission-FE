import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import toggleImg from "@/public/toggle_img.svg";
import profile from "@/public/ic_profile.svg";
import bar from "@/public/bar_img.svg";
import heart from "@/public/ic_heart.svg";
import emptyComment from "@/public/empty_comment_img.svg";
import backImg from "@/public/ic_back.svg";
import Link from "next/link";
import Dropdown from "@/components/Dropdown/Dropdown";
import Modal from "@/components/Modal/Modal";
import styles from "@/styles/detail.module.css";

export default function Board() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCommentDropdownOpen, setIsCommentDropdownOpen] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedId, setUpdatedId] = useState("");

  const [comment, setComment] = useState("");
  const [ableButton, setAbleButton] = useState(false);
  const [newComment, setNewComment] = useState("");

  const getPost = async () => {
    try {
      const res = await axios.get(`/articles/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error("게시글을 가져오는 중 오류 발생:", error);
    }
  };

  const getComments = async ({ limit } = {}) => {
    try {
      const res = await axios.get(`/articles/${id}/comments`, {
        params: { limit },
      });
      setComment(res.data.list);
    } catch (error) {
      console.error("댓글을 가져오는 중 오류 발생:", error);
      if (error.response) {
        console.error("응답 데이터:", error.response.data);
        console.error("응답 상태:", error.response.status);
      } else {
        console.error("요청 중 오류 발생:", error.message);
      }
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.get("/dev/users?pageSize=1");
      const uuid = response.data.list[0].id;
      const res = await axios.post(`/articles/${id}/comments`, {
        content: newComment,
        ownerId: uuid,
      });
      console.log("댓글이 성공적으로 등록 되었습니다:", res.data);
      setNewComment("");
      getComments();
    } catch (error) {
      console.error("댓글 업로드 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPost();
      getComments({ limit: 3 });
    }
  }, [id]);

  useEffect(() => {
    if (newComment.trim() !== "") {
      setAbleButton(true);
    } else {
      setAbleButton(false);
    }
  }, [newComment]);

  const openModal = (comment) => {
    setCurrentComment(comment);
    setUpdatedComment(comment.content);
    setUpdatedId(comment.id);
    setIsModalOpen(true);
  };

  const handleCommentUpdate = async () => {
    try {
      const res = await axios.patch(`/comments/${updatedId}`, {
        content: updatedComment,
      });
      console.log("댓글이 성공적으로 수정되었습니다.", res.data);
      setIsModalOpen(false);
      getComments();
    } catch (error) {
      console.error("댓글 수정 중 요류 발생", error.message);
    }
  };

  const handleCommentDelete = async (comment) => {
    try {
      const res = await axios.delete(`/comments/${comment.id}`, {
        content: comment.content,
      });
      console.log("댓글이 성공적으로 삭제되었습니다.", res.data);
      getComments();
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생", error.message);
    }
  };

  if (!post) {
    return <p>로딩중...</p>;
  }

  const toggleModal = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCommentModal = (index) => {
    setIsCommentDropdownOpen((prev) => {
      const newState = Array.isArray(prev) ? [...prev] : [];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const options = [
    {
      value: "modify",
      label: "수정하기",
      style: {
        width: "130px",
        height: "42px",
        border: "1px solid #e5e7eb",
        borderBottom: "none",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "26px",
        color: "#6B7280",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px 12px 0 0",
      },
    },
    {
      value: "delete",
      label: "삭제하기",
      style: {
        width: "130px",
        height: "42px",
        border: "1px solid #e5e7eb",
        borderTop: "none",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "26px",
        color: "#6B7280",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0 0 12px 12px",
      },
    },
  ];

  return (
    <>
      <div className={styles.board_page}>
        <div className={styles.board_header}>
          <div className={styles.wrapper}>
            <div className={styles.board_header_top}>
              <p className={styles.post_title}>{post.title}</p>
              <Image src={toggleImg} alt="점 세 개" onClick={toggleModal} />
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdown_wrapper}>
                <Dropdown
                  options={options.map((option) => ({
                    ...option,
                    action: () => option.action(prop),
                  }))}
                />
              </div>
            )}
          </div>
          <div className={styles.board_header_bottom}>
            <div className={styles.user_info}>
              <Image src={profile} alt="프로필 사진" />
              <p className={styles.panda}>총명한판다</p>
              <p className={styles.date}>2024. 01. 02</p>
            </div>
            <Image src={bar} alt="작대기" />
            <div className={styles.heart_wrapper}>
              <Image src={heart} alt="하트" />
              <p className={styles.heart}>123</p>
            </div>
          </div>
          <p className={styles.content}>{post.content}</p>
        </div>
        <div className={styles.comment_input_body}>
          <p className={styles.leave_comment}>댓글달기</p>
          <textarea
            className={styles.input_comment}
            placeholder="댓글을 입력해주세요."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className={styles.button}>
            <button
              className={`${styles.registration_button} ${
                ableButton ? styles.active_button : ""
              }`}
              onClick={handleCommentSubmit}
              disabled={!ableButton}
            >
              등록
            </button>
          </div>
        </div>
        <div className={styles.comment_body}>
          {comment.length === 0 ? (
            <div className={styles.empty_comment}>
              <Image src={emptyComment} alt="채팅 이미지" />
              <p className={styles.empty_comment_text}>
                아직 댓글이 없어요,
                <br />
                지금 댓글을 달아보세요!
              </p>
            </div>
          ) : (
            comment.map((prop, index) => (
              <div className={styles.comment_details} key={prop.id}>
                <div className={styles.wrapper}>
                  <div className={styles.comment_header}>
                    <p className={styles.comment_title}>{prop.content}</p>
                    <Image
                      src={toggleImg}
                      alt="점 세 개"
                      onClick={() => toggleCommentModal(index)}
                    />
                  </div>
                  {isCommentDropdownOpen[index] && (
                    <div className={styles.dropdown_wrapper}>
                      <Dropdown
                        options={options}
                        onSelect={(option) => {
                          if (option === "modify") {
                            openModal(prop);
                          } else if (option === "delete") {
                            handleCommentDelete(prop);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.user}>
                  <Image src={profile} alt="프로필 사진" />
                  <div className={styles.comment_user_info}>
                    <p className={styles.comment_panda}>똑똑한판다</p>
                    <p className={styles.comment_date}>1시간 전</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <Link href="./" className={styles.link}>
            <button className={styles.back_to_list}>
              목록으로 돌아가기
              <Image src={backImg} alt="화살표" />
            </button>
          </Link>
        </div>

        {isModalOpen && (
          <>
            <Modal onClose={() => setIsModalOpen(false)}>
              <textarea
                className={styles.update_comment_input}
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
              />
              <div className={styles.update_comment_bottom}>
                <div className={styles.update_comment_profile}>
                  <Image src={profile} alt="프로필" />
                  <div className={styles.profile_wrapper}>
                    <p className={styles.update_comment_panda}>똑똑한판다</p>
                    <p className={styles.update_comment_date}>1시간 전</p>
                  </div>
                </div>
                <div className={styles.update_comment_button_wrapper}>
                  <p
                    className={styles.update_comment_cancel}
                    onClick={() => setIsModalOpen(false)}
                  >
                    취소
                  </p>
                  <button
                    className={styles.update_comment_done}
                    onClick={handleCommentUpdate}
                  >
                    수정하기
                  </button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
}
