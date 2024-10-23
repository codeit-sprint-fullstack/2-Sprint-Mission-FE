import styles from "./board.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchApi } from "@/utils/fetchApi";

export default function Register() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchArticle = async () => {
    if (id) {
      try {
        const data = await fetchApi(`/articles/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetchApi(
        `/articles/${id}`,
        {
          title,
          content,
        },
        "PATCH"
      );
      router.push(`/board/${id}`);
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  return (
    <>
      <div className={styles.register_container}>
        <div className={styles.register_title}>
          <h2>게시글 수정</h2>
          <button className={styles.register_buttion} onClick={handleUpdate}>
            등록
          </button>
        </div>
        <div className={styles.register_form}>
          <form>
            <h3>*제목</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.register_input}
            />
            <h3>*내용</h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${styles.register_input} ${styles.register_textarea}`}
            />
          </form>
        </div>
      </div>
    </>
  );
}
