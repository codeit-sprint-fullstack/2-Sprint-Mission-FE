import { useState } from "react";
import styles from "./board.module.css";
import { fetchApi } from "@/utils/fetchApi";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchApi(
        "/articles",
        {
          title,
          content,
        },
        "POST"
      );
      router.push("/board");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className={styles.register_container}>
        <div className={styles.register_title}>
          <h2>게시글 쓰기</h2>
          <button
            className={styles.register_buttion}
            onClick={handleSubmit}
            type="submit"
          >
            등록
          </button>
        </div>
        <div className={styles.register_form}>
          <form onSubmit={handleSubmit}>
            <h3>*제목</h3>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              className={styles.register_input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <h3>*내용</h3>
            <textarea
              placeholder="내용을 입력해주세요"
              className={`${styles.register_input} ${styles.register_textarea}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </form>
        </div>
      </div>
    </>
  );
}
