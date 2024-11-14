import styles from "@/styles/register.module.css";
import axios from "@/lib/axios";
import { useState } from "react";

export default function Register() {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const handlePostArticle = async (e) => {
    e.preventDefault();
    if (!titleValue || !contentValue) {
      alert("제목과 내용을 입력해 주세요."); // 입력값이 비어있을 경우 경고
      return;
    }
    try {
      await axios.post(`/article`, {
        title: titleValue,
        content: contentValue,
      });
      setTitleValue("");
      setContentValue("");
      window.location.href = "/";
    } catch (error) {
      console.error("게시글 등록 실패", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.registerTable}>
          <p className={styles.registerFont}>게시글 쓰기</p>
          <p className={styles.registerButton} onClick={handlePostArticle}>
            등록
          </p>
        </div>
        <p className={styles.title}>*제목</p>
        <input
          className={styles.titleInput}
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          placeholder="제목을 입력해 주세요"
        />
        <p className={styles.content}>*내용</p>
        <textarea
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
          className={styles.contentInput}
          placeholder="내용을 입력해주세요"
        />
      </div>
    </>
  );
}
