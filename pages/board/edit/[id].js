import styles from "../styles/register.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchApi } from "@/utils/fetchApi";

export default function Register() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

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

  useEffect(() => {
    if (title.trim() !== "" && content.trim() !== "") {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [title, content]);

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
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className={styles.register_container}>
        <div className={styles.register_title}>
          <h2>게시글 수정</h2>
          <button
            className={`${styles.register_button} ${
              isButtonEnabled ? styles.active_button : ""
            }`}
            onClick={handleUpdate}
            disabled={!isButtonEnabled}
          >
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
              required
            />
            <h3>*내용</h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${styles.register_input} ${styles.register_textarea}`}
              required
            />
          </form>
        </div>
      </div>
    </>
  );
}
