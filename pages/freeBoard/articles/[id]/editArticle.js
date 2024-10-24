import styles from "@/styles/register.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "@/lib/axios";

export async function getServerSideProps(context) {
  const articleId = context.params["id"];
  try {
    const res = await axios.get(`/articles/${articleId}`);
    const article = res.data;
    return {
      props: {
        article
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default function editArticle({ article }) {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 버튼 활성화 상태를 업데이트하는 함수
  const updateButtonState = (newTitle, newContent) => {
    if (newTitle.trim() !== "" && newContent.trim() !== "") {
      setIsBtnActive(true); // 제목과 내용이 모두 있을 때 버튼 활성화
    } else {
      setIsBtnActive(false); // 하나라도 비어 있을 경우 버튼 비활성화
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateButtonState(newTitle, content); // 제목과 내용의 상태를 기준으로 버튼 활성화 여부 판단
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateButtonState(title, newContent); // 제목과 내용의 상태를 기준으로 버튼 활성화 여부 판단
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const data = { title, content };
      const res = await axios.patch(`/articles/${article.id}`, data);
      const editArticle = res.data;

      if (editArticle) {
        router.push(`/freeBoard/articles/${article.id}`);
      } else {
        alert("게시글 수정을 실패하였습니다.");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>게시글 수정</h1>
          <button
            className={`${styles.editBtn} ${isBtnActive ? styles.active : ""}`}
            type="submit"
            onClick={handleSubmit}
            disabled={!isBtnActive || isLoading}
          >
            {isLoading ? "수정 중" : "수정"}
          </button>
        </div>
        <div className={styles.formSection}>
          <form>
            <h2>*제목</h2>
            <input
              className={styles.inputSection}
              type="text"
              value={title}
              placeholder="제목을 입력해주세요"
              onChange={handleTitleChange}
            />
            <h2>*내용</h2>
            <textarea
              className={`${styles.inputSection} ${styles.textareaSection}`}
              type="text"
              value={content}
              placeholder="내용을 입력해주세요"
              onChange={handleContentChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
