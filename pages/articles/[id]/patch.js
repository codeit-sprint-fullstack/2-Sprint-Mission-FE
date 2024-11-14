import styles from "@/styles/register.module.css";
import axios from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const articleId = context.params["id"];
  let article;
  try {
    const res = await axios.get(`/article/${articleId}`);
    article = res.data;
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      article,
    },
  };
}

export default function Patch({ article }) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/article/${article.id}`, { title, content });
      router.push(`/articles/${article.id}`); // 수정 완료 후 게시글 페이지로 이동
    } catch (error) {
      console.error("수정 중 오류 발생", error);
    }
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.registerTable}>
          <p className={styles.registerFont}>게시글 쓰기</p>
          <button className={styles.registerButton} type="submit">
            등록
          </button>
        </div>
        <p className={styles.title}>*제목</p>
        <input
          className={styles.titleInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해 주세요"
        />
        <p className={styles.content}>*내용</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.contentInput}
          placeholder="내용을 입력해주세요"
        />
      </form>
    </>
  );
}
