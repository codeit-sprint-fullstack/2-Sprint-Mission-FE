import axios from "@/lib/axios";
import styles from "@/styles/Article.module.css";
import { useState } from "react";
import formatDate from "@/lib/formatDate";
import Comment from "@/components/Comment";
import Link from "next/link";
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
  const res = await axios.get(`/article/${articleId}/comments`);
  const comments = res.data;

  return {
    props: {
      article,
      comments,
    },
  };
}

export default function Article({ article, comments }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();

  const handlePatch = (id) => {
    setActiveDropdown(null);
    router.push(`/articles/${id}/patch`);
  };

  const handleDelete = async (id) => {
    setActiveDropdown(null);
    try {
      await axios.delete(`/article/${id}`);
      window.location.href = "/";
    } catch (error) {
      console.error("게시글 삭제 실패", error);
    }
  };

  const toggleDropdown = (id) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.articleContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.titleTable}>
              <p className={styles.title}>{article.title}</p>
              {/*kebab 아이콘*/}
              <img
                src="/ic_kebab.png"
                alt="kebabDropdown"
                className={styles.kebabDropdown}
                onClick={() => toggleDropdown(article.id)}
              />
              {/* 드롭다운 메뉴 */}
              {activeDropdown === article.id && (
                <div className={styles.dropdownMenu}>
                  <button onClick={() => handlePatch(article.id)}>
                    수정하기
                  </button>
                  <button onClick={() => handleDelete(article.id)}>
                    삭제하기
                  </button>
                </div>
              )}
            </div>
            <div className={styles.authorContain}>
              <div className={styles.author}>
                <img src="/ic_profile.png" alt="profile" />
                <p className={styles.nickNames}>총명한 판다</p>
                <p className={styles.date}>
                  {formatDate(new Date(article.createdAt))}
                </p>
              </div>
              <div className={styles.likeContain}>
                <div className={styles.likeTable}>
                  <img src="/ic_heart.png" />
                  <p className={styles.like}> 999+</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contentTable}>{article.content}</div>
        </div>
        <Comment
          comments={comments}
          toggleDropdown={toggleDropdown}
          activeDropdown={activeDropdown}
          articleId={article.id}
        />
        <Link href={"/"}>
          <div className={styles.comeBackButton}>
            <p className={styles.comeBackFont}>목록으로 돌아가기</p>
            <img src="/ic_back.png" alt="comebackhome" />
          </div>
        </Link>
      </div>
    </>
  );
}
