import styles from "@/styles/Article.module.css";
import Image from "next/image";
import profileIcon from "@/public/ic_profile.svg";
import heartIcon from "@/public/ic_heart.svg";
import backIcon from "@/public/ic_back.svg";
import Link from "next/link";
import axios from "@/lib/axios";
import formatDate from "@/lib/formatDate";
import KebabMenu from "@/components/KebabMenu";
import ArticleCommentList from "@/components/ArticleCommentList";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(context) {
  const articleId = context.params["id"];

  try {
    const res = await axios.get(`articles/${articleId}`);
    const article = res.data ?? [];

    const commentsRes = await axios.get(`articles/${articleId}/comments`);
    const articleComments = commentsRes.data ?? [];

    return {
      props: {
        article,
        articleComments
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
}

export default function Article({ article, articleComments: initialComments }) {
  const router = useRouter();
  const [articleComments, setArticleComments] = useState(initialComments);
  const [articleCommentContent, setArticleCommentContent] = useState("");
  const [isCommentValid, setIsCommentValid] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setArticleCommentContent(value);
    setIsCommentValid(value.trim().length > 0);
  };

  const handleSubmitComment = async () => {
    if (!isCommentValid) return;

    try {
      const newComment = { content: articleCommentContent };
      const res = await axios.post(
        `/articles/${article.id}/comments`,
        newComment
      );
      const addedComment = res.data;
      setArticleComments((prevComments) => [addedComment, ...prevComments]);
      setArticleCommentContent("");
      setIsCommentValid(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  async function handleDeleteArticle(e) {
    if (confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/articles/${article.id}`);
        router.push("/freeBoard");
      } catch (e) {
        console.error(e.response?.data || e.message);
        alert("삭제에 실패했습니다.");
      }
    }
  }

  const handleEditArticle = () =>
    router.push(`/freeBoard/articles/${article.id}/editArticle`);

  return (
    <div className={styles.layout}>
      <div className={styles.contentContainer}>
        <div className={styles.articleContainer}>
          <div className={styles.title}>
            <p>{article.title}</p>
            <KebabMenu
              id={article.id}
              onEditClick={handleEditArticle}
              onDeleteClick={handleDeleteArticle}
            />
          </div>
          <div className={styles.articleInfo}>
            <div className={styles.userInfo}>
              <Image
                className={styles.userImg}
                width="40"
                height="40"
                src={profileIcon}
                alt="profileIcon"
              />
              <p className={styles.nickname}>총명한판다</p>
              <p className={styles.createAt}>{formatDate(article.createdAt)}</p>
            </div>
            <div className={styles.line}></div>
            <button className={styles.likeBtn}>
              <div className={styles.heartIcon}>
                <Image fill src={heartIcon} alt="heartIcon" />
              </div>
              <p>123</p>
            </button>
          </div>
          <div className={styles.content}>
            <p>{article.content}</p>
          </div>
        </div>

        <div className={styles.commentContainer}>
          <div className={styles.commentRegisterContainer}>
            <p>댓글달기</p>
            <textarea
              className={styles.commentTextarea}
              placeholder="댓글을 입력해주세요."
              value={articleCommentContent}
              onChange={handleInputChange}
            ></textarea>
            <div className={styles.btnContainer}>
              <button
                className={`${styles.registerBtn} ${
                  isCommentValid ? styles.active : ""
                }`}
                disabled={!isCommentValid}
                onClick={handleSubmitComment}
              >
                등록
              </button>
            </div>
          </div>
          <ArticleCommentList
            articleComments={articleComments}
            setArticleComments={setArticleComments}
          />
        </div>
      </div>

      <div className={styles.returnBtnContainer}>
        <Link href={"/freeBoard"} className={styles.linkBtn}>
          목록으로 돌아가기
          <Image width="24" height="24" src={backIcon} alt="backIcon" />
        </Link>
      </div>
    </div>
  );
}
