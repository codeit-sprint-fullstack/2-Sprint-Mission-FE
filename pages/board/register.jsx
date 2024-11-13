import styles from "@/styles/register.module.css";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function register() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ableButton, setAbleButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("/dev/users");
      const id = response.data.list[0].id;
      const res = await axios.post("/articles", {
        title,
        content,
        ownerId: id,
      });
      router.push(`/board/${res.data.id}`);
      console.log("게시글이 성공적으로 등록 되었습니다:", res.data);
    } catch (error) {
      console.error("게시글 등록 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    if (title.trim() !== "" && content.trim() !== "") {
      setAbleButton(true);
    } else {
      setAbleButton(false);
    }
  }, [title, content]);

  return (
    <>
      <div className={styles.register_container}>
        <div className={styles.register_header}>
          <p className={styles.write_post}>게시글 쓰기</p>
          <button
            className={`${styles.registration_button} ${
              ableButton ? styles.active_button : ""
            }`}
            onClick={handleSubmit}
            disabled={!ableButton}
          >
            등록
          </button>
        </div>
        <div className={styles.register_body}>
          <form onSubmit={handleSubmit}>
            <p className={styles.title}>*제목</p>
            <textarea
              className={styles.input_title}
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className={styles.content}>*내용</p>
            <textarea
              className={styles.input_content}
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </form>
        </div>
      </div>
    </>
  );
}
