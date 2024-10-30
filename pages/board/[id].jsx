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
import styles from "@/styles/detail.module.css";
import Link from "next/link";
import Dropdown from "@/components/Dropdown/Dropdown";

export default function Board() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const [comment, setComment] = useState([]);
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

  const getComments = async ({ limit }) => {
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

  useEffect(() => {
    if (id) {
      getPost();
      getComments({ limit: 3 });
    }
  }, [id]);

  if (!post) {
    return <p>로딩중...</p>;
  }

  const toggleModal = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post("/articles", { title, content });
  //     router.push(`/board/${res.id}`);
  //     console.log("게시글이 성공적으로 등록 되었습니다:", res.data);
  //   } catch (error) {
  //     console.error("게시글 등록 중 오류가 발생했습니다:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (comment.trim() !== "") {
  //     setAbleButton(true);
  //   } else {
  //     setAbleButton(false);
  //   }
  // }, [comment]);

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
          <div className={styles.board_header_top}>
            <p className={styles.post_title}>{post.title}</p>
            <Image src={toggleImg} alt="점 세 개" onClick={toggleModal} />
            {isDropdownOpen && <Dropdown options={options} />}
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
          />
          <div className={styles.button}>
            <button
              className={`${styles.registration_button} ${
                ableButton ? styles.active_button : ""
              }`}
              // onClick={handleSubmit}
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
            comment.map((prop) => (
              <div className={styles.comment_details} key={prop.id}>
                <div className={styles.comment_header}>
                  <p className={styles.comment_title}>{prop.content}</p>
                  <Image src={toggleImg} alt="점 세 개" />
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
      </div>
    </>
  );
}
