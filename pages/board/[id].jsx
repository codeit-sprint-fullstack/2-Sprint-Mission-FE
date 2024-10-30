import axios from "@/lib/axios";
import styles from "@/styles/board.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import toggleImg from "@/public/toggle_img.svg";

export default function Board() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);

  const getPost = async () => {
    try {
      const res = await axios.get(`/articles/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error("게시글을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  if (!post) {
    return <p>로딩중...</p>;
  }

  return (
    <>
      <div className={styles.board_page}>
        <div className={styles.board_header}>
          <div className={styles.board_header_top}>
            <p>{post.title}</p>
            <Image src={toggleImg} alt="점 세 개" />
          </div>
          <div className={styles.board_header_bottom}></div>
          <p>{post.content}</p>
        </div>
      </div>
    </>
  );
}
