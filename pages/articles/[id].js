import style from "@/styles/ArticleDetail.module.css";
import { useEffect, useState } from "react";
import { getArticle } from "@/pages/api/ArticleService";
import { useRouter } from "next/router";
import Image from "next/image";
import kebab from "@/public/ic_kebab.png";
import profile from "@/public/ic_profile.png";
import heart from "@/public/ic_heart.png";
import Spinner from "@/components/Spinner";
import { formatDate } from "@/utils/formatDate";
import Comment from "@/components/Comment";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const articleData = await getArticle(id);
          setArticle(articleData);
        } catch (error) {
          console.error(error.message);
        }
      }
    };
    fetchArticle();
  }, [id]);

  if (!article)
    return (
      <div className={style.loading}>
        <Spinner />
      </div>
    );

  return (
    <div className={style.top}>
      <div className={style.body}>
        <div className={style.titleSection}>
          <h1 className={style.title}>{article.title}</h1>
          <Image className={style.kebabIcon} src={kebab} alt="kebab"></Image>
        </div>
        <div className={style.dateFavSection}>
          <div className={style.profile}>
            <Image className={style.profileImg} src={profile} alt="user icon" />
            <p className={style.userName}>총명한 판다</p>
            <p className={style.date}>{formatDate(article.createdAt)}</p>
          </div>
          <div className={style.favSection}>
            <Image className={style.heartIcon} src={heart} alt="heart"></Image>
            <p className={style.favoriteCnt}>{article.favoriteCnt}</p>
          </div>
        </div>
        <hr className={style.hr} />
        <div className={style.contentSection}>
          <p className={style.content}>{article.content}</p>
        </div>
        <div className={style.commentSection}>
            <label className={style.comment} htmlFor="commentInput">댓글 달기</label>
            <textarea 
              id="commentInput" 
              className={style.commentInput}
              placeholder="댓글을 입력해주세요" />
            <button className={style.submitBtn}>등록</button>
        </div>
        {/* <div className={style.commentList}>
            <Comment />
        </div> */}
      </div>
    </div>
  );
}
